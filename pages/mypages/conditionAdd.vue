<template>
	<view>
		<view class="a1"> 基本信息</view>
		<view class="uni-input-group">
			<view class="uni-input-row-item">
				<label>工点(必填)：</label>
				<input disabled="true" @click="selGongDian" :value="conditionName" placeholder="请选择工点..." />
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
					<input disabled="true" :value="todayDate" />
				</picker>
				<text class="iconfont" @click="bindDateChange">&#xe609;</text>
			</view>
			<view class="uni-input-row-item">
				<label>补充说明：</label>
				<textarea class="uni-input-textarea" placeholder="请说明..." v-model="Mark" :value="Mark"></textarea>
			</view>
		</view>
		<button class="uni-common-mt" type="primary" @click="onNext">下一步</button>
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
				username: '',
				siteId: '',
				Mark: '',
				radioValue: 1,
				condition: ''
			}
		},
		methods: {
			radioChange: function(evt) {
				//console.log("evt.value => "+ evt.target.value);
				this.radioValue = evt.target.value;
			},
			onNext: function() {
				if (undefined === this.conditionName || "" === this.conditionName) {
					uni.showToast({
						icon: 'none',
						title: '请选择工点.'
					})
					return;
				}
				// 生成工况的mode json用于提交
				var mode = {
					UnitID: service.getUsers()[0].unitid, // 创建人单位信息
					UnitName: service.getUsers()[0].unitname, // 创建人单位信息
					StepDate: this.todayDate, //日期
					Status: this.radioValue, // 施工状态 => 返回数字
					CreatorName: service.getUsers()[0].account, // 上传人
					UploadDate: '', // 上传日期
					CurrentSiteID: this.siteId, // 工点ID
					Mark: this.Mark, // 补充说明
					Title: this.conditionName, // 用于列表名称展示
					Steps:[] //JSON.stringify()
				}
				// 判断是新建工况还是检查工况
				if (undefined === this.condition) {
					// 新建：获取工点下分区
					uni.request({
						url: service.SERVICE_URL + 'MCsp/GetSiteAreas',
						data: {
							siteid: this.siteId
						},
						success(succ) {
							if (succ.statusCode === 200) {
								//console.log("succ.data size "+ succ.data.length+ " => "+ JSON.stringify(succ.data))
								for (let i = 0; i < succ.data.length; i++) {
									succ.data[i].CanSelect = false;
								}
								uni.navigateTo({
									//url: './conditionPartition'
									url: './conditionPartitionLeft?pointLists=' + JSON.stringify(succ.data) + '&mode=' + JSON.stringify(mode)
								})
							} else {
								console.log(succ.statusCode)
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
								title: '获取分区失败.'
							});
						}
					})
				} else {
					var vCondition = this.condition;
					// 检查：获取工点下分区
					uni.request({
						url: service.SERVICE_URL + 'MCsp/GetSiteAreas',
						data: {
							siteid: this.condition.CurrentSiteID
						},
						success(succ) {
							if (succ.statusCode === 200) {
								//console.log("succ.data size "+ succ.data.length+ " => "+ JSON.stringify(succ.data))
								for (let i = 0; i < succ.data.length; i++) {
									succ.data[i].CanSelect = false;
								}
								uni.navigateTo({
									url: './conditionPartitionLeft?pointLists=' + JSON.stringify(succ.data)+ '&condition='+ JSON.stringify(vCondition)
								})
							} else {
								console.log(succ.statusCode)
								uni.showToast({
									icon: 'none',
									title: '获取分区失败.'
								});
							}
						},
						fail() {
							console.log('fail => 获取分区失败.')
						}
					})
				}
			},
			selGongDian() {
				// 判断是否检查工况
				if (undefined == this.condition) {
					uni.navigateTo({
						url: './conditionSelect'
					})
				}
			},
			bindDateChange: function(e) {
				this.todayDate = e.target.value
			}
		},
		onLoad(load) {
			this.todayDate = now.date;
			this.endDate = now.date;
			this.username = service.getUsers()[0].account;
			this.startDate = service.getLastUploadDate();
			if (undefined != load.condition) {
				// 初始化工况要检查的数据
				var con = JSON.parse(load.condition);
				this.condition = con;
				//console.log("load.condition => "+ load.condition);
				this.conditionName = con.Title;
				this.radioValue = con.Status;
				this.todayDate = con.StepDate;
				this.Mark = con.Mark;
			} else {
				this.condition = undefined;
			}
		},
		onShow() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1]
			if (undefined != page.data.point) {
				this.conditionName = page.data.point;
				//console.log(this.conditionName)
			}
			if (undefined != page.data.siteId) {
				this.siteId = page.data.siteId;
				//console.log(this.siteId)
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
</style>
