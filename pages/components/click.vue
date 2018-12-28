<template>
	<view>
		<view class="demo" @click="clickTest" @longtap="longtap"></view>
		<view v-for="(item, index) in students" class="persons" @click="menuClick" v-bind:id="index">
			{{index}} - {{item.name}}
		</view>
	</view>
</template>
<script>
	export default {
		data: {
			students: [{
					name: "zhang",
					age: 13
				},
				{
					name: "lisi",
					age: 14
				}
			]
		},
		methods: {
			clickTest: function(e) {
				console.log(e);
				uni.showToast({
					icon: "none",
					title: "click"
				});
			},
			longtap: function(e) {
				console.log(e);
				uni.showToast({
					icon: "none",
					title: "longtap"
				});
			},
			menuClick: function(e) {
				console.log(e);
				uni.showToast({
					icon: "none",
					title: e.target.id
				})
			}
		}
	}
</script>
<style>
	.demo {
		width: 200px;
		margin: 50px auto;
		background: #8F8F90;
		height: 200px;
	},
	.persons {
		width: 200px;
		line-height: 2.2em;
	}
</style>
