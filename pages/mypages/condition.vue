<template>
	<view class="page">
		<!-- <uni-nav-bar color="#333333" background-color="#FFFFFF" right-icon="search" @click-right="conditionSearch">
			<block slot="left">
				<view class="city">
					<text style="font-size: 32upx;"> </text>
				</view>
			</block>
			<view class="input-view">
				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="请输入搜索..." />
			</view>
		</uni-nav-bar> -->
		<view class="uni-padding-wrap uni-common-mt">
			<view class="segmented-control" :class="styleType" style="border-color: #007aff">
				<view v-for="(item, index) in titleList" class="segmented-control-item" :key="index" :class="styleType" :style="index === current ? activeStyle : itemStyle"
				 @click="onClickItem(index)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="content">
			<view v-show="current === 0">
				<view class="uni-list">
					<checkbox-group @change="checkboxChange">
						<view class="uni-list-cell" v-for="(item,index) in localList" :key="index">
							<checkbox class="uni-list-cell-navigate-box" :value="index"></checkbox>
							<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover" @click="conditionCheck(index,item)">
								<view class="title_body">
									<view class="title_site">{{item.siteName}}</view>
									<view class="title_cond">{{item.conditionName}}</view>
								</view>
								<view class="uni-list-cell-navigate-date">{{item.StepDate}}</view>
							</view>
						</view>
					</checkbox-group>
				</view>
				<view v-show="localList.length">
					<button style="margin: 10upx;" type="primary" :disabled="submitList.length>0?false:true" @click="bindSubmit()">提交</button>
				</view>
			</view>
			<view v-show="current === 1">
				<view class="uni-list">
					<view class="uni-list-cell" v-for="(item,index) in submitedList" :key="index">
						<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover">
							{{item.title}}
							<view class="uni-list-cell-navigate-date">{{item.date}}</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/search-date/uni-nav-bar.vue"
	import uniIcon from "../../components/search-date/uni-icon.vue"
	import service from '../../common/service.js'

	export default {
		data() {
			return {
				current: 0,
				activeColor: '#007aff',
				styleType: 'button',
				titleList: ["未提交", "已提交"],
				localList: [],
				submitedList: [],
				submitList: [],
				listIndex: 0
			}
		},
		methods: {
			conditionSearch() {
				uni.showToast({
					icon: "none",
					title: "搜索"
				})
			},
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
				if (1 === index) {
					uni.request({
						url: service.SERVICE_URL + 'MCsp/GetConstructionStepList',
						success(succ) {
							console.log("succ => " + JSON.stringify(succ));
						},
						fail() {
							console.log("fail => 获取本用户上传的施工工况列表");
						}
					})
				}
			},
			getUnitEngineerings() {
				// 获取所有单位工程
				uni.request({
					url: service.SERVICE_URL + 'MCsp/GetAllUnitEngineerings',
					success(succ) {
						if (succ.statusCode === 200) {
							//console.log("data size "+ succ.data.length+ " => "+ JSON.stringify(succ.data[0]))
							service.setUnitEngineeringLists(succ.data)
						} else {
							console.log(succ.statusCode)
							uni.showToast({
								icon: 'none',
								title: '获取单位工程失败.'
							})
						}
					},
					fail() {
						console.log("fail => 获取单位工程失败.")
					}
				})
			},
			checkboxChange: function(e) {
				var items = this.localList,
					values = e.detail.value;
				this.submitList = [];
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items.indexOf(items[i]) == values[j]) {
							items[i].checked = true;
							this.submitList.push(items[i])
							break
						}
					}
				}
				//console.log("this.submitList size "+ this.submitList.length);
			},
			bindSubmit: function() {
				var list = this.submitList[0]
				//console.log("list => " + JSON.stringify(list));
				if (0 < list.Steps.length) {
					for (var step = 0; step < list.Steps.length; step++) {
						var attArr = list.Steps[step].Attributes;
						var imgs = [];
						if (0 < attArr.length) {
							for (var i = 0; i < attArr.length; i++) {
								// 从Attributes中获取图片集合
								if ("Upload" === attArr[i].DataType) {
									imgs = JSON.parse(attArr[i].Value);
									break;
								}
							}
						}
						//console.log("imgs size " + imgs.length + " => " + JSON.stringify(imgs));
						if (0 < imgs.length) {
							var i = step
							var valueArr = []; // 定义一个图片上传后保存数据的集合
							this.uploadImage(imgs);
							setTimeout(function() {
								valueArr = service.getImgDataArr();
								//console.log("valueArr => " + JSON.stringify(valueArr));
								service.removeImgArr();
								// 将组装好的图片信息JSON.stringify()后存放在Attributes中Upload下的Value中
								if (0 < attArr.length) {
									for (var i = 0; i < attArr.length; i++) {
										if ("Upload" === attArr[i].DataType) {
											attArr[i].Value = JSON.stringify(valueArr);
											break;
										}
									}
								}
								//console.log("list => "+ JSON.stringify(list));
							}, 500)
						}
						const _this = this;
						setTimeout(function() {
							// 给Steps进行JSON.stringify()，和Save接口格式保持统一
							list.Steps = JSON.stringify(list.Steps);
							//console.log("list => "+ JSON.stringify(list));
							uni.request({
								url: service.SERVICE_URL + 'MCsp/Save',
								method: 'POST',
								header: {
									'content-type': "application/x-www-form-urlencoded",
									'UserToken': service.getUsers().Token
								},
								data: list,
								success(succ) {
									console.log("succ MCsp/Save => " + JSON.stringify(succ));
									if (succ.data) {
										uni.showToast({
											icon: 'none',
											title: '提交成功。'
										})
									} else {
										uni.showToast({
											icon: 'none',
											title: '提交失败。'
										})
									}
								},
								fail() {
									console.log("fail => MCsp/Save");
								},
								complete() {
									_this.localList.splice(_this.localList.indexOf(list), 1);
									_this.submitList.splice(0, 1);
									service.removeAllCondition()
									if (0 < _this.localList.length) {
										for (var i = 0; i < _this.localList.length; i++) {
											_this.localList[i].checked = false;
										}
										for (var i = 0; i < _this.localList.length; i++) {
											service.setAllCondition(_this.localList[i]);
										}
									}
								}
							})
						}, 800)
					}
				} else {
					uni.showToast({
						icon: 'none',
						title: '请检查工况.',
						mask: false,
						duration: 1500
					});
				}
			},
			uploadImage: function(imgs) {
				for (var i = 0; i < imgs.length; i++) {
					//console.log("imgs[i] => " + imgs[i]);
					var urlArr = imgs[i].split('/');
					var lastUrl = urlArr[urlArr.length - 1]
					var imgName = lastUrl.split('.')[0];
					var value = {
						FileOldName: '',
						FileNewName: '',
						Url: '',
						FileSize: '',
						FileType: '',
					}
					// 先上传附件（图片）
					// const uploadTask = 
					uni.uploadFile({
						url: service.SERVICE_URL + 'MCsp/upload',
						filePath: imgs[i],
						name: 'file',
						success: (succ) => {
							var succData = JSON.parse(succ.data)
							console.log("succData => " + JSON.stringify(succData));
							if ("" != succData && succData.success) {
								value.FileOldName = imgName;
								value.FileNewName = succData.fileName;
								value.Url = succData.url;
								value.FileSize = succData.size
								var urlArr = succData.url.split('.')
								value.FileType = urlArr[urlArr.length - 1]
								//console.log("value => " + JSON.stringify(value));
								service.setImgDataArr(value)
							} else {
								uni.showToast({
									icon: 'none',
									title: '附件上传失败',
									mask: false,
									duration: 1500
								});
							}
						},
						fail() {
							console.log("fail => img upload");
							uni.showToast({
								icon: 'none',
								title: '请检查网络或服务.',
								mask: false,
								duration: 1500
							});
						}
					});
					/* uploadTask.onProgressUpdate((res) => {
						console.log('上传进度' + res.progress);
						console.log('已经上传的数据长度' + res.totalBytesSent);
						console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
						// 测试条件，取消上传任务。
						if (res.progress > 50) {
							uploadTask.abort();
						}
					}); */

					// 将上传成功的图片本地保存
					uni.saveImageToPhotosAlbum({
						filePath: imgs[i],
						success: function(entry) {
							//console.log('saveImage => success');
						},
						fail: function() {
							//console.log("saveImage => fail");
						}
					});
				}
			},
			conditionCheck: function(index, con) {
				this.listIndex = index;
				if (0 < this.submitList.length) {
					uni.showToast({
						icon: 'none',
						title: '请撤销提交状态.',
						mask: false,
						duration: 1500
					});
					return;
				}
				//console.log("con => "+ JSON.stringify(con));
				uni.navigateTo({
					url: './conditionAdd?conditionMode=' + JSON.stringify(con) + "&checked=true&listIndex=" + this.listIndex
				})
			}
		},
		onNavigationBarButtonTap(data) {
			//console.log(JSON.stringify(index)) => {"text":"任务","fontSize":"18px","__cb__":{"id":"plus291547100205599","htmlId":"86516565"},"index":0}
			if (data.index === 0) {
				if ("[]" === JSON.stringify(service.getUsers())) {
					console.log("set login")
					uni.showToast({
						icon: 'none',
						title: '请登录身份认证.'
					})
					return;
				}
				uni.navigateTo({
					url: '../mypages/conditionAdd'
				})
			}
		},
		computed: {
			activeStyle() {
				return 'color: #fff;border-color: #007aff;background-color: #007aff';
			},
			itemStyle() {
				return 'color: #007aff;border-color: #007aff;';
			}
		},
		components: {
			uniNavBar,
			uniIcon
		},
		onLoad() {
			this.getUnitEngineerings()
		},
		onShow() {
			var pages = getCurrentPages();
			var page = pages[pages.length - 1]
			if (undefined === page.data.button || "" === page.data.button) {
				if (undefined != service.getAllCondition() && "" != service.getAllCondition()) {
					//console.log("this.localList => "+ JSON.stringify(service.getAllCondition()));
					this.localList = service.getAllCondition()
				}
			}
		}
	}
</script>

<style>
	.city {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: center;
		width: 100%;
		margin-left: 8px;
	}

	.input-view {
		width: 90%;
		display: flex;
		background-color: #e7e7e7;
		height: 30px;
		border-radius: 15px;
		padding: 0 4%;
		flex-wrap: nowrap;
		margin: 7px 0;
		line-height: 30px;
	}

	.input-view .uni-icon {
		line-height: 30px !important;
	}

	.input-view .input {
		height: 30px;
		line-height: 30px;
		width: 100%;
		padding: 0 3%;
	}

	.uni-list-cell-navigate-box {
		padding: 22upx 30upx;
		line-height: 45upx;
		width: 40upx;
		align-items: center;
	}

	.uni-list-cell-navigate-date {
		width: 160upx;
		margin-right: 20upx;
		align-items: center;
	}

	.content {
		margin-top: 30upx;
	}

	.segmented-control {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 75%;
		font-size: 28upx;
		border-radius: 10upx;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
	}

	.segmented-control.button {
		border: 2upx solid;
	}

	.segmented-control-item {
		flex: 1;
		text-align: center;
		line-height: 60upx;
		box-sizing: border-box;
	}

	.segmented-control-item.button {
		border-left: 1upx solid;
	}

	.segmented-control-item:first-child {
		border-left-width: 0;
	}

	.img-empty {
		width: 500upx;
		height: 500upx;
		margin-top: 30upx;
	}

	.title_body {
		display: flex;
		flex-direction: column;
	}

	.title_body .title_site {
		font-size: 35upx;
		padding: 0upx;
		line-height: 30upx;
	}
	
	.title_body .title_cond {
		font-size: 27upx;
		color: #919191;
		margin-top: 5upx;
		padding: 0upx;
		line-height: 30upx;
	}
</style>
