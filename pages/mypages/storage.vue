<template>
	<view>
		<button class="btn" type="primary" @tap="save">uni.setStorage(OBJECT)</button>
		<button class="btn" type="primary" @tap="save2">uni.setStorageSync(KEY,DATA)</button>
		<button class="btn" type="primary" @tap="get">uni.getStorage(OBJECT)</button>
		<button class="btn" type="primary" @tap="get2">uni.getStorageSync(KEY)</button>
		<button class="btn" type="primary" @tap="getInfo">uni.getStorageInfo(OBJECT)</button>
		<button class="btn" type="primary" @tap="getInfo2">uni.getStorageInfoSync()</button>
		<button class="btn" type="primary" @tap="remove">uni.removeStorage(OBJECT)</button>
		<button class="btn" type="primary" @tap="remove2">uni.removeStorageSync(KEY)</button>
		<button class="btn" type="primary" @tap="clear">uni.clearStorage()</button>
		<button class="btn" type="primary" @tap="clear2">uni.clearStorageSync()</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			save() {
				uni.setStorage({
					key: 'sk',
					data: 'come on!',
					success() {
						console.log("suc.");
					}
				});
			},
			save2() {
				try {
					uni.setStorageSync('sk', 'You can do it');
					console.log("ces.");
				} catch (e) {
					//TODO handle the exception
				}
			},
			get() {
				uni.getStorage({
					key: 'sk',
					success: (res) => {
						uni.showToast({
							title: res.data,
							icon: 'none'
						});
					}
				});
			},
			get2() {
				try {
					const key = uni.getStorageSync('sk');
					if (key) {
						uni.showToast({
							title: key,
							icon: 'none'
						});
					}
				} catch (e) {
					//TODO handle the exception
				}
			},
			getInfo() {
				uni.getStorageInfo({
					key: 'sk',
					success: function(res) {
						console.log(res.keys);
						console.log(res.currentSize);
						console.log(res.limitSize);
					},
					fail: (e) => {
						console.log(e.msg);
					}
				});
			},
			getInfo2() {
				try {
					const res = uni.getStorageInfoSync();
					console.log(res.keys);
					console.log(res.currentSize);
					console.log(res.limitSize);
				} catch (e) {
					// error
				}
			},
			remove() {
				uni.removeStorage({
					key: 'sk',
					success: function(res) {
						console.log('success');
					}
				});
			},
			remove2() {
				try {
					uni.removeStorageSync('sk');
				} catch (e) {
					// error
				}
			},
			clear(){
				uni.clearStorage();
			},
			clear2(){
				uni.clearStorageSync();
			}
		}
	}
</script>

<style>
	.btn {
		margin: 10px;
	}
</style>
