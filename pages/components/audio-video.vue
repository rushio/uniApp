<template>
	<view class="av">
		<audio style="text-align: left" :src="current.src" :poster="current.poster" :name="current.name" :author="current.author"
		 :action="audioAction" controls></audio>
		<view style="height: 20px;">video视频</view>
		<!-- http://img.cdn.qiniu.dcloud.net.cn/wap2appvsnative.mp4-->
		<video src="../../static/video/demo.mp4" @error="videoerror" controls></video>
		<view style="height: 20px;">map地图</view>
		<map style="width: 100%; height: 300px;" :latitude="latitude" :longitude="longitude" :markers="covers">
		</map>
	</view>
</template>
<script>
	export default {
		data() {
			return {

				title: 'audio',
				current: {
					poster: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.jpg',
					name: '致爱丽丝',
					author: '暂无',
					src: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/audio/music.mp3',
				},
				audioAction: {
					method: 'pause'
				},
				titlemap: 'map',
				latitude: 39.909,
				longitude: 116.39742,
				covers: [{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '../../../static/location.png'
				}, {
					latitude: 39.90,
					longitude: 116.39,
					iconPath: '../../../static/location.png'
				}]
			}
		},
		methods: {
			videoerror: function(e) {
				uni.showToast({
					title: '视频错误信息:' + e.target.errMsg,
					icon: 'none'
				})
			}
		}
	}
</script>
<style>
	.av {
		padding: 10px;
	}
</style>
