<template>
	<view>
		<button @tap="setTitle">修改title</button>
		<button @tap="setThemeColor">修改Theme背景色</button>
		<button @tap="settabBarText">为tabBar右上角添加文本</button>
		<button @tap="removeTabBarText">移除tabBar右上角的文本</button>
		<button @tap="showTabBarRedDot">显示tabBar的右上角的红点</button>
		<button @tap="hideTabBarRedDot">隐藏tabBar的右上角的红点</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			setTitle: function() {
				uni.setNavigationBarTitle({
					title: '修改后的Title',

				});
			},
			setThemeColor: function() {
				uni.setNavigationBarColor({
					frontColor: '#ffffff', // 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
					backgroundColor: '#B19FB6' //背景颜色值，有效值为十六进制颜色
					//animation 动画效果
					//animation.duration 动画变化时间，默认0，单位：毫秒
					//animation.timingFunc 	动画变化方式，默认 linear
				})
			},
			settabBarText: function() {
				//为 tabBar 某一项的右上角添加文本。
				uni.setTabBarBadge({
					index: 0, //tabBar的哪一项，从左边算起
					text: '000', // 显示的文本，不超过 3 个半角字符
					success: () => {},
					fail: (res) => {}
				});
			},
			removeTabBarText: function() {
				//移除 tabBar 某一项右上角的文本。
				uni.removeTabBarBadge({
					index: 0,
					success: () => {},
					fail: (res) => {}
				});
			},
			showTabBarRedDot: function() {
				//显示 tabBar 某一项的右上角的红点。
				uni.showTabBarRedDot({
					index: 0, // tabBar的哪一项，从左边算起
					success: () => {},
					fail: (res) => {}
				});
			},
			hideTabBarRedDot: function() {
				//隐藏 tabBar 某一项的右上角的红点。
				uni.hideTabBarRedDot({
					index: 0, //Number 	是 	tabBar的哪一项，从左边算起
					success: () => {}, //接口调用成功的回调函数
					fail: (res) => {}
				});
			}
		}
	}
</script>

<style>
	button {
		margin-bottom: 2upx;
	}
</style>
