<template>
	<view style="padding-top: 30upx;">
		<view class="uni-grid-9">
			<view class="uni-grid-9-item" hover-class="uni-grid-9-item-hover" v-for="(item,index) in gridList" :key="index"
			 :class="index % 3 === 2 ? 'no-border-right' : ''" @click="onClick(index)">
				<image class="uni-grid-9-image" :src="item.icon"></image>
				<text class="uni-grid-9-text">{{item.text}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	import service from "../../common/service.js"
	export default {
		data() {
			return {
				userInfo: '',
				gridList: [{
					text: '施工工况',
					icon: '../../static/img/risk_assessment.png'
				}]
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
					case 1:
						break;
					default:
						break;
				}
			}
		},
		onLoad() {
			//console.log("service.getUsers => "+ JSON.stringify(service.getUsers()));
			if ("[]" === JSON.stringify(service.getUsers())) {
				console.log("set login")
				uni.reLaunch({
					url: "./login"
				})
			} else {
				this.userInfo = service.getUsers();
				var log = "{\"account\":\"" + this.userInfo.account + "\",\"token\":\"" + this.userInfo.Token + "\"}"
				console.log("get login => " + log)
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
