<template>
	<view class="page">
		<uni-nav-bar color="#333333" background-color="#FFFFFF" right-icon="search" @click-right="conditionSearch">
			<block slot="left">
				<view class="city">
					<text style="font-size: 32upx;"> </text>
					<!-- <uni-icon type="arrowdown" color="#333333" size="22"></uni-icon> -->
				</view>
			</block>
			<view class="input-view">
				<!-- <uni-icon type="search" size="22" color="#666666"></uni-icon> -->
				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="请输入搜索..." />
			</view>
		</uni-nav-bar>
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
				<view v-if="localList.length">
					<view class="uni-list">
						<checkbox-group @change="checkboxChange">
							<view class="uni-list-cell" v-for="(item,index) in localList" :key="index">
								<checkbox class="uni-list-cell-navigate-box" :value="index"></checkbox>
								<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover" @click="conditionCheck(index,item)">
									{{item.Title}}
									<view class="uni-list-cell-navigate-date">{{item.StepDate}}</view>
								</view>
							</view>
						</checkbox-group>
					</view>
					<button style="margin: 10upx;" type="primary" :disabled="submitList.length>0?false:true" @click="bindSubmit()">提交</button>
				</view>
				<view style="text-align: center;" v-else>
					<image class="img-empty" src="../../static/img/network_error.png"></image>
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
				//console.log("list => "+ JSON.stringify(list));
				console.log("token => "+ service.getUsers()[0].token);
				uni.request({
					url: service.SERVICE_URL + 'MCsp/Save',
					method: 'POST',
					header:{
						'content-type':"application/x-www-form-urlencoded",
						'UserToken': service.getUsers()[0].token
					},
					data: list,
					success(succ) {
						if ("true" === succ.data) {
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
						console.log("succ => " + JSON.stringify(succ));
					},
					fail() {
						console.log("fail");
					}
				})
			},
			conditionCheck: function(index, con) {
				this.listIndex = index;
				//console.log("con => "+ JSON.stringify(con));
				uni.navigateTo({
					url: './conditionAdd?conditionMode=' + JSON.stringify(con)+ "&checked=true"
				})
			}
		},
		onNavigationBarButtonTap(data) {
			//console.log(JSON.stringify(index)) => {"text":"任务","fontSize":"18px","__cb__":{"id":"plus291547100205599","htmlId":"86516565"},"index":0}
			if (data.index === 0) {
				// 获取某工点最后一次施工工况日期
				uni.request({
					url: service.SERVICE_URL + 'MCsp/GetLastUploadDate',
					method: 'GET',
					data: {},
					success: res => {
						if (res.statusCode === 200) {
							//console.log("date => "+ JSON.stringify(res.data));
							service.setLastUploadDate(res.data)
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
			if (undefined != page.data.conditionMode && "" != page.data.conditionMode) {
				//console.log("data.conditionMode => "+ page.data.conditionMode);
				var mode = JSON.parse(page.data.conditionMode);
				// 给Steps进行JSON.stringify()，和Save接口格式保持统一
				mode.Steps = JSON.stringify(mode.Steps)
				if ("true" === page.data.checked) {
					this.localList.splice(this.listIndex, 1, mode);
				} else {
					this.localList.push(mode)
				}
				//console.log("this.localList size "+ this.localList.length+ " => "+ this.localList[0].Title)
				page.data.conditionMode = undefined; // 设置undefined防止重复添加
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
</style>
