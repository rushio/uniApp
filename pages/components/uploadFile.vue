<template>
	<view>
		<progress :percent="percent" stroke-width="10"></progress>
		<button type="primary" :loading="loading" :disabled="disabled" @tap="upload">选择照片</button>
	</view>
</template>

<script>
	var _self;
	export default {
		data() {
			return {
				percent: 0,
				loading: false,
				disabled: false
			};
		},
		methods: {
			upload: function() {
				_self = this;
				uni.chooseImage({
					count: 1,
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: function(res) {
						const path = res.tempFilePaths;
						const uploadTask = uni.uploadFile({
							url: 'https://demo.hcoder.net/index.php?c=uperTest',
							filePath: path[0],
							name: 'file',
							formData: {
								'user': 'test'
							},
							success(uploadFileRes) {
								console.log(uploadFileRes.data);
							}
						});

						uploadTask.onProgressUpdate(function(res) {
							_self.percent = res.progress;
							console.log('上传进度' + res.progress);
							console.log('已经上传的数据长度' + res.totalBytesSent);
							console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);
						});
					},
					fail(e) {
						console.log(e);
					}
				});
			}
		}
	}
</script>

<style>

</style>
