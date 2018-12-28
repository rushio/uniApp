<template>
	<view>
		<button @tap="get">相册选择</button>
		<button @tap="get2">获取图片信息</button>
		<button @tap="get3">保存图片到系统相册</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			get: function() {
				uni.chooseImage({
					count: 6, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
						// 预览图片
						uni.previewImage({
							urls: res.tempFilePaths
						})
					}
				});
			},
			get2: function() {
				uni.chooseImage({
					count: 1,
					sourceType: ['album'],
					success: function(res) {
						uni.getImageInfo({
							src: res.tempFilePaths[0],
							success: function(img) {
								console.log(img.width);
								console.log(img.height);
								uni.showToast({
									title: '宽：' + img.width + ' / 高：' + img.height,
									icon: 'none'
								})
							}
						})
					}
				});
			},
			get3: function() {
				uni.chooseImage({
					count: 1,
					sourceType: ['camera'],
					success: function(res) {
						uni.saveImageToPhotosAlbum({
							filePath: res.tempFilePaths[0],
							success: function() {
								uni.showToast({
									title: '保存成功。',
									icon: 'none'
								})
							}
						});
					}
				});
			}

		}
	}
</script>

<style>

</style>
