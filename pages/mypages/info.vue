<template>
	<view>
		<scroll-view scroll-y="true">
			<view class="management_column">
				<text>管理栏目</text>
				<view style="height: 60upx; width: 4upx; background: #0faeff;"></view>
				<text>添加栏目</text>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		}
	}
</script>

<style>
	.management_column {
		background: #B3B3B3;
		height: 100upx;
		margin: 15upx;
		position: relative;
		display: flex;
		align-items: center;
		align-content: center;
	}
</style>
