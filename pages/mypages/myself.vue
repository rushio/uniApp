<template>
	<view class="">
		<userCenten :user="userInfo" @bindSignOut="bindSignOut"></userCenten>
	</view>
</template>
<script>
	import service from "../../common/service.js"
	import userCenten from '../../components/user-center/user-center.vue'
	export default {
		data() {
			return {
				userInfo: [{
					account: '您未登录'
				}]
			}
		},
		methods: {
			bindSignOut() {
				uni.showActionSheet({
					itemList: ['退出登录'],
					success: function(succ) {
						switch (succ.tapIndex) {
							case 0:
								service.removeUser()
								uni.reLaunch({
									url: "./login"
								})
								break;
						}
					}/* ,
					fail: function(res) {
						console.log(res.errMsg);
					} */
				})
			}
		},
		onLoad() {
			if ("[]" === JSON.stringify(service.getUsers())) {
				console.log("set login")
				uni.reLaunch({
					url: "./login"
				})
			} else {
				this.userInfo = service.getUsers();
				var log = "{\"account\":\"" + this.userInfo.account + "\",\"token\":\"" + this.userInfo.Token + "\"}"
				console.log("get login => " + log)
				uni.switchTab({
					url: './application'
				})
			}
		},
		onShow() {
			uni.setNavigationBarTitle({
				title: "我的"
			})
		},
		components: {
			userCenten
		}
	}
</script>
<style></style>
