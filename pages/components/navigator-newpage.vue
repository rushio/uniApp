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
		},
		onLoad: function(options) {
			console.log(options);
			console.log(options.title);
		}
	}
</script>

<style>

</style>
