<template>
	<view class="center">
		<view class="logo">
			<image class="logo-img" :src="avatarUrl"></image>
			<view class="logo-title">
				<text class="uer-name" @click="bindUser">Hi，{{userInfo.account}}</text>
				<view v-show="!isLogin" class="go-login">
					<navigator url="login" open-type="reLaunch" hover-class="navigator-hover">去登录></navigator>
				</view>
			</view>
		</view>
		<view v-show="isLogin" style="flex-direction: column;">
			<view class="uni-list">
				<view class="uni-list-cell uni-list-cell-navigate">单位：
					<view class="uni-list-item">{{ userInfo.UnitName!=null?userInfo.UnitName:'' }}</view>
				</view>
				<view class="uni-list-cell uni-list-cell-navigate">职务：
					<view class="uni-list-item">{{ userInfo.UnitTypeName!=null?userInfo.UnitTypeName:'' }}</view>
				</view>
				<view class="uni-list-cell uni-list-cell-navigate">电话：
					<view class="uni-list-item">{{ userInfo.TelephoneNum!=null?userInfo.TelephoneNum:'' }}</view>
				</view>
				<view class="uni-list-cell uni-list-cell-navigate">性别：
					<view class="uni-list-item">{{ userInfo.Sex!=null?userInfo.Sex:'' }}</view>
				</view>
				<view class="uni-list-cell uni-list-cell-navigate">邮箱：
					<view class="uni-list-item">{{ userInfo.Email!=null?userInfo.Email:'' }}</view>
				</view>
			</view>
			<button type="primary" class="uer-sign-out" @click="bindSignOut()">退出登录</button>
		</view>
	</view>
</template>
<script>
	import service from "../../common/service.js"

	export default {
		data() {
			return {
				isLogin: false,
				userInfo: {
					account: '您未登录'
				},
				avatarUrl: "../../static/img/user-icon.png"
			}
		},
		methods: {
			bindSignOut() {
				service.removeUser()
				console.log("set login");
				uni.reLaunch({
					url: "./login"
				})
			},
			bindUser() {
				console.log("this.userInfo => " + JSON.stringify(this.userInfo))
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: "我的"
			})
		},
		onLoad() {
			//console.log("service.getUsers => "+ JSON.stringify(service.getUsers()));
			if ("[]" === JSON.stringify(service.getUsers())) {
				this.isLogin = false;
			} else {
				this.userInfo = service.getUsers();
				this.isLogin = true;
			}
		}
	}
</script>
<style>
	page,
	view {
		display: flex;
	}

	page {
		background-color: #f8f8f8;
	}

	.center {
		flex-direction: column;
	}

	.logo {
		width: 750upx;
		height: 240upx;
		padding: 20upx;
		box-sizing: border-box;
		background-color: #0099FF;
		flex-direction: row;
		align-items: center;
	}

	.logo-hover {
		opacity: 0.8;
	}

	.logo-img {
		width: 150upx;
		height: 150upx;
		border-radius: 150upx;
	}

	.logo-title {
		height: 150upx;
		flex: 1;
		justify-content: space-between;
		flex-direction: column;
		margin-left: 20upx;
	}

	.uer-name {
		margin-top: 35upx;
		height: 60upx;
		line-height: 60upx;
		font-size: 38upx;
		color: #FFFFFF;
	}

	.go-login {
		font-size: 33upx;
		color: #FFFFFF;
	}

	.uni-list {
		margin-top: 30upx;
		background-color: #FFFFFF;
		position: relative;
		width: 100%;
		display: flex;
		flex-direction: column;
	}

	.uni-list-item {
		width: 80%;
		align-items: flex-start;
	}

	.uer-sign-out {
		width: 100%;
		margin-top: 50upx;
	}
</style>
