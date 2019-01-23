<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="getSubItemLists(item, index)" :key="index" :class="index==categoryActive?'active':''"
				 v-for="(item,index) in partitionLists">
					{{item.Text}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'"
			 scroll-with-animation>
				<view class="uni-card">
					<view class="uni-list">
						<view class="uni-list-cell uni-collapse" v-for="(list,index) in subItemLists[0]" :key="index" :class="index === subItemLists[0].length - 1 ? 'uni-list-cell-last' : ''">
							<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.IsSite ? 'uni-active' : ''"
							 @click="trigerCollapse(index)">
								{{list.name}}
							</view>
							<view class="uni-list uni-collapse" :class="list.IsSite ? 'uni-active' : ''">
								<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.items" :key="key"
								 :class="key === list.items.length - 1 ? 'uni-list-cell-last' : ''" @click="toConditionCreate(list.Data.Attributes)">
									<view class="uni-list-cell-navigate"> {{item.name}} </view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import service from '../../common/service.js'

	export default {
		data() {
			return {
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				partitionLists: [],
				unitEngineeringLists: [],
				subItemLists: []
			}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			getSubItemLists(partition, index) {
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
				//console.log("partition => " JSON.stringify(partition))
				this.subItemLists = [];
				for (let i = 0; i < this.unitEngineeringLists.length; i++) {
					if (partition.ProjectTypeCode === this.unitEngineeringLists[i].Data.Code) {
						this.subItemLists.push(this.unitEngineeringLists[i].items)
					}
				}
			},
			toConditionCreate(attributes) {
				uni.navigateTo({
					url: './conditionCreate?att='+ attributes
				})
			},
			trigerCollapse(e) {
				for (let i = 0, len = this.subItemLists[0].length; i < len; ++i) {
					if (e === i) {
						this.subItemLists[0][i].IsSite = !this.subItemLists[0][i].IsSite;
					} else {
						this.subItemLists[0][i].IsSite = false;
					}
				}
			}
		},
		onLoad: function() {
			this.height = uni.getSystemInfoSync().windowHeight;
			// getPointLists获取工点下的所有分区
			this.partitionLists = service.getPointLists()
			//console.log("lists => "+ this.partitionLists.length+ " "+ JSON.stringify(this.partitionLists[0]))
			// getUnitEngineeringLists获取本地的所有单位工程
			this.unitEngineeringLists = service.getUnitEngineeringLists();
			if (1 <= this.partitionLists.length) {
				this.getSubItemLists(this.partitionLists[0], 0)
			}
		}
	}
</script>

<style>
	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 70%;
		background-color: #FFFFFF;
	}

	.nav-right-item {
		width: 28%;
		height: 220upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
	}

	.nav-right-item image {
		width: 100upx;
		height: 100upx;
	}

	.active {
		color: #007AFF;
	}
</style>
