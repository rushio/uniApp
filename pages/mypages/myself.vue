<template>
	<view class="">
		<userCenten :user="userInfo"></userCenten>
	</view>
</template>
<script>
	import server from "../../common/service.js"
	import userCenten from '../../components/user-center/user-center.vue'
	export default {
		data() {
			return {
				userInfo: [{
					account: '您未登录'
				}]
			}
		},
		onLoad() {
			if ("[]" === JSON.stringify(server.getUsers())) {
				console.log("set login")
				uni.reLaunch({
					url: "./login"
				})
			} else {
				this.userInfo = server.getUsers();
				var log = "{\"account\":\"" + this.userInfo[0].account + "\",\"token\":\"" + this.userInfo[0].token + "\"}"
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
