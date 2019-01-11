<template>
	<view>
		<view class="uni-grid-9 uni-common-mt">
			<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in gridText" :key="index"
			 :class="index % 3 === 2 ? 'no-border-right' : ''" @click="onClick(index)">
				<image class="uni-grid-9-image" src="../../static/img/uni@2x.png"></image>
				<text class="uni-grid-9-text">{{item}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				gridText: ['工况', '协同', '公文', '会议', '查询统计', '新闻', '公告', '文档', '任务', '会议', '统计', '时间安排', '登录'],
				gridIcon: []
			};
		},
		methods: {
			onClick: function(index) {
				switch (index) {
					case 0:
						uni.navigateTo({
							url: "../mypages/condition"
						})
						break;
					case 12:
						uni.navigateTo({
							url: "../mypages/login"
						})
						break;
					default:
						break;
				}
			}
		}
	}
</script>

<style>
	/* 九宫格 */
	.uni-grid-9 {
		background: #ffffff;
		width: 750upx;
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		border-top: 2upx solid #eee;
	}

	.uni-grid-9-item {
		width: 250upx;
		height: 200upx;
		/* padding: 30upx; */
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		border-bottom: 2upx solid;
		border-right: 2upx solid;
		border-color: #eee;
		box-sizing: border-box;
	}

	.no-border-right {
		border-right: none;
	}

	.uni-grid-9-image {
		width: 120upx;
		height: 110upx;
		margin-top: 12upx;
	}

	.uni-grid-9-text {
		width: 250upx;
		line-height: 8upx;
		height: 40upx;
		margin-top: 12px;
		text-align: center;
		font-size: 34upx;
	}

	.uni-grid-9-item-hover {
		background: rgba(0, 0, 0, 0.05);
	}
</style>
