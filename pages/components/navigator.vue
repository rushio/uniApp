<template>
	<view>
		<view class="page-body">
			<view class="btn-area">
				<navigator url="navigatornewpage?title=navigator" hover-class="navigator-hover">
					<button type="default">跳转到新页面，并传值</button>
				</navigator>
				<navigator url="navigatornewpage" redirect hover-class="other-navigator-hover">
					<button type="default">在当前页打开</button>
				</navigator>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				title: 'navigator'
			};
		},
		methods: {

		}
	}
</script>

<style>

</style>
