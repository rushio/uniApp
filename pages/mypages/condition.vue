<template>
	<view class="page">
		<uni-nav-bar color="#333333" background-color="#FFFFFF" right-icon="search" @click-right="search">
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
				<view class="uni-list">
					<view class="uni-list-cell" v-for="(item,index) in dataList" :key="index">
						<checkbox class="uni-list-cell-navigate-box"></checkbox>
						<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover">
							{{item.title}}
							<view class="uni-list-cell-navigate-date">{{item.date}}</view>
						</view>
					</view>
				</view>
			</view>
			<view v-show="current === 1">
				<view class="uni-list">
					<view class="uni-list-cell" v-for="(item,index) in dataList" :key="index">
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
				dataList: [{
					title: "线路-标段-工点",
					commit: 0,
					date: '2019-01-15'
				}, {
					title: "线路-标段1-工点2",
					commit: 1,
					date: '2019-01-15'
				}, {
					title: "线路-标段-工点2",
					commit: 0,
					date: '2019-01-15'
				}, {
					title: "线路-标段1-工点",
					commit: 1,
					date: '2019-01-14'
				}],
				current: 0,
				activeColor: '#007aff',
				styleType: 'button',
				titleList: ["未提交", "已提交"],
				commitList: [],
				localList: []
			}
		},
		methods: {
			search() {
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
			groupList: function() {
				console.log("groupList")
			},
			getUnitEngineerings () {
				// 获取所有单位工程
				uni.request({
					url: service.SERVICE_URL+ 'MCsp/GetAllUnitEngineerings',
					success(succ) {
						if(succ.statusCode === 200){
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
			}
		},
		onNavigationBarButtonTap(data) {
			//console.log(JSON.stringify(index)) => {"text":"任务","fontSize":"18px","__cb__":{"id":"plus291547100205599","htmlId":"86516565"},"index":0}
			if (data.index === 0) {
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
</style>
