<template>
	<view class="page">
		<uni-nav-bar color="#333333" background-color="#FFAABB" margin-top="20upx" class="uni-nav-bar" fixed="false" right-icon="scan" @click-left="showCity" @click-right="scan">
			<block slot="left">
				<view class="city">
					<text style="font-size: 32upx;">日期：</text>
					<!-- <uni-icon type="arrowdown" color="#333333" size="22"></uni-icon> -->
				</view>
			</block>
			<view class="input-view">
				<!-- <uni-icon type="search" size="22" color="#666666"></uni-icon> -->
				<input confirm-type="search" @confirm="confirm" class="input" type="text" placeholder="输入搜索日期" />
			</view>
		</uni-nav-bar>

		<view class="uni-list">
			<view class="uni-list-cell uni-collapse" v-for="(list,index) in lists" :key="index" :class="index === lists.length - 1 ? 'uni-list-cell-last' : ''">
				<view class="uni-list-cell-navigate uni-navigate-right" hover-class="uni-list-cell-hover" :class="list.show ? 'uni-active' : ''"
				 @click="trigerCollapse(index)">
					{{list.title}}
				</view>
				<view class="uni-list uni-collapse" :class="list.show ? 'uni-active' : ''">
					<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.item" :key="key" :class="key === list.item.length - 1 ? 'uni-list-cell-last' : ''">
						<view class="uni-list-cell-navigate uni-navigate-right"> {{item}} </view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import uniNavBar from "../../components/search-date/uni-nav-bar.vue"
	import uniIcon from "../../components/search-date/uni-icon.vue"

	export default {
		data() {
			return {
				lists: [{
						title: "横通道",
						show: false,
						item: ["1#导洞", "2#导洞", "3#导洞"]
					},
					{
						title: "左线大里程",
						show: false,
						item: ["1#导洞", "2#导洞"]
					}
				]
			}
		},
		methods: {
			trigerCollapse(e) {
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					if (e === i) {
						this.lists[i].show = !this.lists[i].show;
					} else {
						this.lists[i].show = false;
					}
				}

			}
		},
		onNavigationBarButtonTap(data) {
			//console.log(JSON.stringify(index)) => {"text":"任务","fontSize":"18px","__cb__":{"id":"plus291547100205599","htmlId":"86516565"},"index":0}
			if (data.index === 0) {
				uni.navigateTo({
					url: '../mypages/construction'
				})
			}
		},
		components: {
			uniNavBar,
			uniIcon
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
		width: 88%;
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
		width: 94%;
		padding: 0 3%;
	}
</style>
