<template>
	<view>
		<button @tap="click">btn</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
			methods:{
				click:function(){
					uni.setNavigationBarTitle({
						title:'test3',
						
					});
					uni.setNavigationBarColor({
						frontColor: '#ffffff', // 前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000
						backgroundColor: '#B19FB6' //背景颜色值，有效值为十六进制颜色
						//animation 动画效果
						//animation.duration 动画变化时间，默认0，单位：毫秒
						//animation.timingFunc 	动画变化方式，默认 linear
					})
				}
			}
	}
</script>

<style>

</style>
