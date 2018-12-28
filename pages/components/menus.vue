<template>
	<scroll-view class="menus">
		<view v-for="(menu, index) in menus" :class="[index == currentIndex ? 'menuActive' : '']">{{menu}}</view>
	</scroll-view>
</template>

<script>
	export default {
		data: {
			currentIndex: 0,
			menus: ['新闻', '汽车', '读书']
		}
	}
</script>

<style>
	.menus {
		width: 700px;
		margin: 0 auto;
		padding: 20px 0px;
	}

	.menus view {
		padding: 8px;
		line-height: 20px;
		font: 38px;
		float: left;
	}

	.menuActive {
		color: #900;
	}
</style>
