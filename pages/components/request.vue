<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		onLoad:function(){
			// get
			const requestTask1= uni.request({
				url: 'https://demo.hcoder.net',
				success: function(res){
					console.log(res.data);
				}
			});
			// 
			const requestTask2= uni.request({
				url: 'https://demo.hcoder.net/index.php?m=getJson',
				success: function(res){
					console.log(JSON.stringify(res));
				}
			});
			// post
			const requestTask3= uni.request({
				url: 'https://demo.hcoder.net/index.php',
				data: {name: 'hcoder...', 'age': 18},
				method: "POST",
				header: {'content-type': 'application/x-www-form-urlencoded'},
				success: function(res){
					console.log(JSON.stringify(res.data));
				}
			});
		}
	}
</script>

<style>

</style>
