<template>
	<view>
		<view class="uni-center">
			<image class="image" mode="widthFix" src="../../static/img/logo.png" />
		</view>
		<view class="input-group">
			<view class="input-row border">
				<text class="title">账号：</text>
				<input type="text" maxlength="10" confirm-type="next" v-model="account" placeholder="请输入账号">
			</view>
			<view class="input-row">
				<text class="title">密码：</text>
				<input type="text" maxlength="10" confirm-type="done" password="true" v-model="password" placeholder="请输入密码">
				<view class="icon-eys-position">
					<view class="uni-icon uni-icon-eye" :class="[!showPassword ? 'uni-active' : '']" @click="changePassword"></view>
				</view>
			</view>
		</view>
		<view class="btn-row">
			<button type="primary" class="primary" @click="bindLogin">登录</button>
		</view>
		<view>
			<navigator url="setting" hover-class="navigator-hover">
				<text class="text">设置</text>
			</navigator>
		</view>
	</view>
</template>

<script>
	import server from '../../common/service.js'
	export default {
		data() {
			return {
				account: '',
				password: '',
				showPassword: true
			};
		},
		methods: {
			changePassword: function() {
				this.showPassword = !this.showPassword;
			},
			bindLogin: function() {
				if (this.account.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入用户名.'
					});
					return;
				}
				if (this.password.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请输入密码.'
					});
					return;
				}
				uni.request({
					url: server.SERVICE_URL+ 'mAccount/LogOn',
					data: {
						username: this.account,
						password: this.password
					},
					success(object) {
						if(object.statusCode === 200) {
							let data = JSON.stringify(object.data);
							if (data != "[]") {
								// 本地存储信息
								const user = {
									account: data.UserName,
									password: this.password
								};
								console.log(data.UnitID);
								// server.addUser(user);
								server.setPoints(data.Projects);
								uni.switchTab({
									url: './application'
								})
							}
						} else {
							console.log(object.statusCode);
							uni.showToast({
								icon: 'none',
								title: '登录失败.'
							});
						}
					},
					fail() {
						uni.showToast({
							icon: 'none',
							title: '登录异常.'
						});
					}
				})
				
			}
		}
	}
</script>

<style>
	.image {
		background: #F4F5F6;
		margin-top: 40upx;
		width: 400upx;
		margin-bottom: 50upx;
	}

	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
		background-color: #efeff4;
		padding: 20px;
	}

	.input-group {
		background-color: #ffffff;
		margin-top: 20px;
		position: relative;
	}

	.input-group::before {
		position: absolute;
		right: 0;
		top: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-group::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 0;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}

	.input-row .title {
		font-size: 18px;
		width: 20%;
		height: 30px;
		min-height: 30px;
		padding: 15px 0;
		padding-left: 22px;
		line-height: 30px;
	}

	.input-row input {
		font-size: 18px;
		width: 80%;
		height: 30px;
		min-height: 30px;
		padding: 15px 0;
		padding-right: 30px;
		line-height: 30px;
	}

	.input-row.border::after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 15px;
		height: 1px;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	.btn-row {
		margin-top: 20px;
		padding: 20px;
	}

	.text {
		font-size: 18px;
		position: relative;
		float: right;
		margin-right: 50upx;
	}

	.icon-eys-position {
		margin-left: 0px;
		margin-top: 15px;
		margin-right: 15px;
	}
</style>
