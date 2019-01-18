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
				userInfo: server.getUsers()
			}
		},
		onLoad() {
			console.log(JSON.stringify(server.getUsers()))
			if ("[]" === JSON.stringify(server.getUsers())) {
				uni.reLaunch({
					url: "./login"
				})
			} else {
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
