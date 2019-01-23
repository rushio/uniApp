<template>
	<view>
		<view class="uni-input-group">
			<view class="uni-input-row-item">
				<label>施工状态：</label>
				<view style="background-color: #EEEEEE;">▼</view>
				<picker mode="selector" @change="bindWorkState" :value="index" :range="workState">
					<view style="padding-right: 300upx;">{{workState[index]}}</view>
				</picker>
			</view>
			<block v-for="(list,index) in attributesList" :key="index">
				<view v-if="'Text' === list.DataType">
					<view class="uni-input-row-item">
						<label>{{list.DisplayName}}：</label>
						<textarea class="uni-input-textarea" placeholder="请说明..."></textarea>
					</view>
				</view>
			</block>
			<view class="uni-input-row-item">
				<label style="padding-top: 15upx;">现场影像：</label>
				<view class="uni-uploader__files">
					<block v-for="(image,index) in imageList" :key="index">
						<view class="uni-uploader__file">
							<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
						</view>
					</block>
					<view class="uni-uploader__input-box">
						<view class="uni-uploader__input" @tap="bindPicture"></view>
					</view>
				</view>
			</view>
			<view class="uni-input-row-item">
				<label>备注：</label>
				<textarea class="uni-input-textarea" placeholder="请说明..."></textarea>
			</view>
		</view>
		<button type="primary">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				attributesList: [],
				index: 0,
				workState: ['施工中', '停工', '已竣工', '未开工'],
				imageList: []
			};
		},
		methods: {
			bindWorkState: function(e) {
				//'picker发送选择改变，携带值为' e.target.value
				//console.log("Statevalue => " + e.target.value)
				this.index = e.target.value
			},
			bindPicture: function() {
				if (this.imageList.length === 5) {
					uni.showModal({
						content: "已经有5张图片了,是否清空现有图片？",
						success: (e) => {
							if (e.confirm) {
								this.imageList = [];
								uni.chooseImage({
									count: 5 - this.imageList.length,
									success:(res) => {
										//console.log("imgPaths => "+ JSON.stringify(res.tempFilePaths))
										this.imageList = this.imageList.concat(res.tempFilePaths);
									}
								})
							}
						}
					})
				} else {
					uni.chooseImage({
						count: 5 - this.imageList.length,
						success:(res) => {
							//console.log("imgPaths => "+ JSON.stringify(res.tempFilePaths))
							this.imageList = this.imageList.concat(res.tempFilePaths);
						}
					})
				}
			},
			previewImage: function(e) {
				var current = e.target.dataset.src
				uni.previewImage({
					current: current,
					urls: this.imageList
				})
			}
		},
		onLoad(load) {
			this.attributesList = JSON.parse(load.att);
			console.log("att size " + this.attributesList.length + " => " + JSON.stringify(this.attributesList))
		}
	}
</script>

<style>

	.uni-input-row-item {
		position: relative;
		display: flex;
		flex-direction: row;
		font-size: 28upx;
		padding: 22upx 30upx;
	}

	.uni-input-textarea {
		padding-top: 20upx;
		height: 150upx;
	}

	.uni-input-row-item label {
		width: 150upx;
	}

	.uni-input-row-item input,
	picker,
	textarea {
		padding-left: 10upx;
		background-color: #EEEEEE;
		margin-right: 5upx;
	}

	.uni-input-group .uni-input-row-item:after {
		position: absolute;
		right: 0;
		bottom: 0;
		left: 30upx;
		height: 2upx;
		content: '';
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}

	button {
		margin: 10upx;
		background: #0FAEFF;
	}
</style>
