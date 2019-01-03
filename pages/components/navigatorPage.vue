<template>
	<view>
		<view class="page-body">
			<view class="btn-area">
				{{title}}
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data: {
			title : "navigatorPage"
		},
		onLoad: function(options) {
			console.log(options);
			this.title = options.title;
		}
	}
</script>

<style>

</style>
