<template>
	<view style="padding: 35px;">
		<!-- if def MP-WEIXIN -->
		<button type="primary" open-type="getUserInfo" @getuserinfo="getuserinfo" withCredentials="true">微信登录</button>
		<!-- end if -->
		<!-- if def APP-PLUS -->
		<button type="primary" open-type="getUserInfo" @click="getuserinfoh5appwx" withCredentials="true">微信登录</button>
		<!-- end if -->
		<button style="margin-top: 50px;">手机号登录</button>

		<view class="hr"></view>
		<view class="v-model">
			<text class="text">账号：</text>
			<input class="in-text" type="text" placeholder="请输入账号:" />
			<view class="hr-padding"></view>
			<text class="text">密码：</text>
			<input class="in-text" type="text" placeholder="请输入密码:" />
		</view>
		<view class="hr"></view>

		<view class="input-row">
			<text class="title">密码：</text>
			<input type="text" password="true" v-model="password" placeholder="请输入密码">
		</view>
	</view>
</template>
<script>
	var _self;
	export default {
		data: {},
		onLoad: function() {
			_self = this;
		},
		methods: {
			getuserinfoh5appwx: function() {
				nui.login({
					success: function(res2) {
						console.log(JSON.stringify(res2) + '2');
						uni.getUserInfo({
							success: function(res3) {
								console.log(JSON.stringify(res3) + '3');
							}
						})
					},
				});
			},
			getuserinfo: function(res1) {
				console.log(JSON.stringify(res1) + '1');
				//如果只需要opendid 和非加密数据至此登录完成
				//此处连接数据库利用openid 就可以进行登录环节
				//免费的视频教程 http://www.hcoder.net/tutorials/info_141.html
				uni.login({
					success: function(res2) {
						console.log(JSON.stringify(res2) + '2');
						//获取 sessionKey
						uni.request({
							url: 'https:///hoa.hcoder.net/xcxencode/?c=sk&appid=wxbb7f9f1f2c6f4f33&secret=739b970b832f0df158f54c494a08e440&code=' +
								res2.code,
							success: function(res3) {
								console.log(JSON.stringify(res3) + '3');
								//记录到本地
								try {
									uni.setStorageSync('sk', res3.data.session_key);
									uni.setStorageSync('openid', res3.data.openid);
								} catch (e) {
									//TODO handle the exception
								}
								uni.hideLoding();
								//以下步骤可以获取加密信息，需要授权
								//获取加密信息
								if (!res1.detail.iv) {
									uni.showToast({
										title: "您取消了授权,登录失败",
										icon: "none"
									});
									return false;
								}
								try {
									var sessionkey = uni.getStorageSync('sk');
									console.log(sessionkey);
								} catch (e) {
									//TODO handle the exception
								}
								uni.request({
									// $appid         = $_POST['appid'];
									// $sessionKey    = $_POST['sessionKey'];
									// $encryptedData = $_POST['encryptedData'];
									// $iv            = $_POST['iv'];
									method: "POST",
									url: 'https:///hoa.hcoder.net/xcxencode/',
									header: {
										'content-type': 'application/x-www-form-urlencoded'
									},
									data: {
										appid: "wxbb7f9f1f2c6f4f33",
										sessionkey: sessionkey,
										iv: res1.detail.iv,
										encryptedData: res1.detail.encryptedData
									},
									success: function(res4) {
										//"﻿﻿﻿{"openId":"oS6of0V0rdp9nY_BuvCnQUasOHYc","nickName":"深海",
										//"gender":1,"language":"zh_CN","city":"Xi'an","province":"Shaanxi",
										//"country":"China","avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/7iags6YD4enyU"
										console.log(JSON.stringify(res4) + '4');
									}
								});
							}
						})
					}
				});
			}

		}
	}
</script>
<style>
	.v-model {
		height: 220upx;
		background: #FFFFFF;
		padding: 20upx;
	}

	.text {
		font-size: 50upx;
		float: left;
		margin-left: 40upx;
	}

	.hr {
		background-color: #D5D5D5;
		height: 4upx;
		width: 100%;
	}

	.hr-padding {
		background-color: #D5D5D5;
		position: relative;
		float: right;
		height: 4upx;
		width: 94%;
		margin-top: 20upx;
		margin-bottom: 10upx;
	}

	.in-text {
		font-size: 45upx;
		margin-top: 20upx;
		position: relative;
		float: left;
		width: 250px;
	}

	.input-row {
		display: flex;
		flex-direction: row;
		position: relative;
	}
</style>
