<template>
	<view>
		<button class="primary" @tap="click">btn</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			click: function() {
				//为 tabBar 某一项的右上角添加文本。
				uni.setTabBarBadge({
					index: 0, //tabBar的哪一项，从左边算起
					text: 'txt', // 显示的文本，不超过 3 个半角字符
					success: () => {
						console.log("yes");
					},
					fail: (res) => {
						console.log(JSON.stringify(res));
					}

				});
				//移除 tabBar 某一项右上角的文本。
				uni.removeTabBarBadge({
					//index:tabBar的哪一项，从左边算起
					//success
					//fail
				});
				//显示 tabBar 某一项的右上角的红点。
				uni.showTabBarRedDot({
					index: 0 // tabBar的哪一项，从左边算起
					//success
					//fail
				});

				//隐藏 tabBar 某一项的右上角的红点。
				uni.hideTabBarRedDot({
					//index 	Number 	是 	tabBar的哪一项，从左边算起
					//success 	接口调用成功的回调函数
					//fail
				});
			}
		},
		onLoad: () => {
			uni.setNavigationBarColor({
				frontColor: '#ffffff',
				backgroundColor: '#B69FAC'
			});
		}
	}
</script>

<style>

</style>
