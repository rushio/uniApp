<template>
	<view>
		<view class="a1"> 基本信息</view>
		<view class="uni-input-group">
			<view class="uni-input-row-item">
				<label>工点(必填)：</label>
				<input disabled="true" @click="conditionChecked" :value="siteName" placeholder="请选择工点..." />
			</view>
			<view class="uni-input-row-item">
				<label>填&nbsp;&nbsp;&nbsp;&nbsp;报&nbsp;&nbsp;&nbsp;人：</label>
				<input disabled="true" :value="username" />
			</view>
			<view class="uni-input-row-item">
				<label>施工状态：(必填)</label>
				<radio-group class="uni-flex" name="gender" @change="radioChange">
					<label>
						<radio :checked="radioValue==1?true:false" value="1" />施工中</label>
					<label>
						<radio :checked="radioValue==0?true:false" value="0" />停工</label>
				</radio-group>
			</view>
			<view class="uni-input-row-item">
				<label>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：</label>
				<picker mode="date" :value="todayDate" :start="startDate" :end="endDate" @change="bindDateChange">
					<view class="input_date_picker">
						<input disabled="true" :value="todayDate" />
						<text class="iconfont">&#xe609;</text>
					</view>
				</picker>
			</view>
			<view class="uni-input-row-item">
				<label>补充说明：</label>
				<textarea class="uni-input-textarea" placeholder="请说明..." v-model="Mark" :value="Mark"></textarea>
			</view>
		</view>
		<button class="uni-common-mt" type="primary" @click="toConditionPartitionLeft()">下一步</button>
	</view>
</template>
<script>
	import now from '../../common/date.js'
	import service from '../../common/service.js'

	export default {
		data() {
			return {
				todayDate: '',
				startDate: '0001-01-01',
				endDate: '',
				conditionName: '',
				siteName: '',
				username: '',
				siteId: '',
				Mark: '',
				radioValue: 1,
				conditionMode: '',
				checked: false,
				isField: false,
				listIndex: 0
			}
		},
		methods: {
			radioChange: function(evt) {
				//console.log("evt.value => "+ evt.target.value);
				this.radioValue = evt.target.value;
			},
			toConditionPartitionLeft: function() {
				if (undefined === this.siteName || "" === this.siteName) {
					uni.showToast({
						icon: 'none',
						title: '请选择工点.'
					})
					return;
				}
				var conditionList = service.getAllCondition();
				// 检索本地工况集合
				if (0 < conditionList.length) {
					var today = '0000-00-00';
					for (var i = 0; i < conditionList.length; i++) {
						var cond = conditionList[i];
						if (cond.CurrentSiteID === this.siteId && cond.siteName === this.siteName) {
							// 同一个工点一天只能有一个工况
							if (cond.StepDate === this.todayDate) {
								uni.showToast({
									icon: 'none',
									title: '该工况已经创建.',
									mask: false,
									duration: 1500
								});
								return;
							}
							var isBig = now.compareDate(today, cond.StepDate);
							if (isBig) {
								today = cond.StepDate;
							}
						}
					}
					// 录入某一个工点的工况，选择日期的时候不能小于最近一次录入日期（本地+服务器）
					if (!now.compareDate(today, this.todayDate)) {
						uni.showToast({
							icon: 'none',
							title: '选择日期不能小于最近一次录入日期',
							mask: false,
							duration: 1500
						});
						return;
					}
				}
				// 生成工况的mode json用于提交
				var mode = {
					UnitID: service.getUsers().unitid, // 创建人单位信息
					UnitName: service.getUsers().unitname, // 创建人单位信息
					StepDate: this.todayDate, //日期
					Status: this.radioValue, // 施工状态 => 返回数字
					CreatorName: service.getUsers().account, // 上传人
					UploadDate: '', // 上传日期
					CurrentSiteID: this.siteId, // 工点ID
					Mark: this.Mark, // 补充说明
					conditionName: this.conditionName, // 用于列表名称展示
					siteName: this.siteName, // 用于列表名称展示
					Steps: [], //JSON.stringify()
					Time: ''
				}
				var id = this.siteId,
					conMode = mode,
					checked = this.checked,
					listIndex = this.listIndex
				// 判断是新建工况还是检查工况 新建false：获取工点下分区，否则true获取当前工况下ID
				if (this.checked) {
					id = this.conditionMode.CurrentSiteID
					conMode = this.conditionMode
					conMode.Status = mode.Status
					conMode.StepDate = mode.StepDate
					conMode.Mark = mode.Mark
				}
				this.getUnitEngineerings(conMode.CurrentSiteID, conMode.StepDate);
				uni.request({
					url: service.SERVICE_URL + 'MCsp/GetSiteAreas',
					data: {
						siteid: id
					},
					success(succ) {
						if (succ.statusCode === 200) {
							//console.log("succ.data size "+ succ.data.length+ " => "+ JSON.stringify(succ.data))
							for (let i = 0; i < succ.data.length; i++) {
								succ.data[i].CanSelect = false;
							}
							//console.log("conMode => "+ JSON.stringify(conMode));
							uni.navigateTo({
								//url: './conditionPartition'
								url: './conditionPartitionLeft?pointLists=' + JSON.stringify(succ.data) +
									'&conditionMode=' + JSON.stringify(conMode) + "&checked=" + checked + "&listIndex=" + listIndex
							})
						} else {
							console.log("获取分区失败 => " + succ.statusCode)
							uni.showToast({
								icon: 'none',
								title: '获取分区失败.'
							});
						}
					},
					fail() {
						console.log('fail => 获取分区失败.')
						uni.showToast({
							icon: 'none',
							title: '请检查网络或服务.'
						});
					}
				})
			},
			getUnitEngineerings: function(siteID, date) {
				// 获取工点某一天的分项工程的填写
				uni.request({
					url: service.SERVICE_URL + 'MCsp/GetUnitEngineerings',
					data: {
						siteID: siteID, // 工点ID
						date: date //施工工况填写日期
					},
					success(succ) {
						//console.log("this.checkSubmitTaskList => " + JSON.stringify(succ.data));
						service.setUnitEngineerings(succ.data);
					},
					fail() {
						console.log("fail => 获取工点某一天的分项工程的填写失败.")
					}
				})
			},
			conditionChecked() {
				// 判断是否检查工况
				if (undefined === this.conditionMode || "" === this.conditionMode) {
					if (this.isField) {
						uni.navigateTo({
							url: './conditionSelectField'
						})
					} else {
						uni.navigateTo({
							url: './conditionSelect'
						})
					}
				}
			},
			bindDateChange: function(e) {
				this.todayDate = e.target.value
			},
			getLastUploadDate: function(siteID) {
				// 获取某工点最后一次施工工况日期
				uni.request({
					url: service.SERVICE_URL + 'MCsp/GetLastUploadDate',
					method: 'GET',
					data: {
						siteID: siteID
					},
					success: res => {
						if (res.statusCode === 200) {
							//console.log("date => "+ JSON.stringify(res.data));
							this.startDate = res.data;
						} else {
							console.log(res.statusCode)
							uni.showToast({
								icon: 'none',
								title: '获取工点最后工况日期失败.'
							})
						}
					},
					fail: () => {
						console.log("fail => 获取某工点最后一次施工工况日期失败.");
					}
				});
			}
		},
		onShow() {
			this.todayDate = now.date();
			this.endDate = now.date();
			if (this.checked) {
				uni.setNavigationBarTitle({
					title: "检查工况"
				})
			}
			var pages = getCurrentPages();
			var page = pages[pages.length - 1]
			if (undefined != page.data.point) {
				this.conditionName = page.data.point.conditionName;
				this.siteName = page.data.point.siteName;
				//console.log(this.conditionName)
				page.data.point = undefined;
			}
			if (undefined != page.data.siteId) {
				this.siteId = page.data.siteId;
				//console.log(this.siteId)
				this.getLastUploadDate(page.data.siteId)
				page.data.siteId = undefined;
			}
			var telsafe = service.SERVICE_URL.indexOf("telsafe.com");
			// 判断服务地址是否域名
			if (0 < telsafe) {
				this.isField = true;
			} else {
				this.isField = false;
			}
		},
		onLoad(load) {
			this.username = service.getUsers().account;
			if (undefined != load.conditionMode && "" != load.conditionMode) {
				// 初始化工况要检查的数据
				this.conditionMode = JSON.parse(load.conditionMode);
				//console.log("this.conditionMode => "+ JSON.stringify(this.conditionMode));
				// this.conditionMode.Steps = JSON.parse(this.conditionMode.Steps)
				this.conditionName = this.conditionMode.conditionName;
				this.siteName = this.conditionMode.siteName;
				this.radioValue = this.conditionMode.Status;
				this.todayDate = this.conditionMode.StepDate;
				this.Mark = this.conditionMode.Mark;
			}
			if (undefined != load.checked && "" != load.checked) {
				this.checked = load.checked;
				//console.log("this.checked => "+ this.checked);
			}
			if (undefined != load.listIndex && "" != load.listIndex) {
				this.listIndex = load.listIndex;
				//console.log("this.listIndex => "+ this.listIndex);
			}
		}
	}
</script>

<style>
	.a1 {
		margin: 10upx 20upx;
	}

	.uni-input-row-item {
		position: relative;
		display: flex;
		flex-direction: row;
		font-size: 28upx;
		padding: 22upx 30upx;
	}

	.uni-input-textarea {
		padding-top: 20upx;
		height: 200upx;
	}

	.uni-input-row-item input,
	textarea {
		padding-left: 10upx;
		background-color: #EEEEEE;
		margin-right: 5upx;
	}

	.uni-input-group .uni-input-row-item:after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 2upx;
		content: '';
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	button {
		margin: 10upx;
		background: #0FAEFF;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('http://at.alicdn.com/t/font_1013928_wpmredcnffc.ttf') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 22px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	.input_date_picker {
		display: flex;
		flex-direction: row;
	}
</style>
