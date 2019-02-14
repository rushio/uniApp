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
						<textarea class="uni-input-textarea" v-model="text" :value="text" placeholder="请说明..."></textarea>
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
				<textarea class="uni-input-textarea" v-model="mark" :value="mark" placeholder="请说明..."></textarea>
			</view>
		</view>
		<button type="primary" @click="conditionCreate">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				attributesList: [],
				index: 0,
				workState: ['施工中', '停工', '未开工', '已竣工'],
				imageList: [],
				mark: '',
				text: '',
				mode: '',
				condition: '',
				taskId: ''
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
			},
			conditionCreate() {
				var att = {
					FieldName: this.text, // 文本
					Value: this.index, // 
					Datas: this.imageList // 照片
				}
				var pages = getCurrentPages();
				var page = pages[pages.length - 4]; // pages.length表示所有页数 -1表示当前页面 -2表示上一个页面
				if (undefined === this.condition || "" === this.condition) {
					var parseSteps = this.mode.Steps[0]
					// console.log("parseSteps => "+ JSON.stringify(parseSteps));
					parseSteps.Status = this.index; // 施工状态
					parseSteps.Mark = this.mark // 备注
					parseSteps.Attributes.push(att)
					this.mode.Steps = []
					this.mode.Steps.push(parseSteps)
					//console.log("this.mode => "+ JSON.stringify(this.mode))
					page.setData({
						mode: JSON.stringify(this.mode),
						checked: false
					})
				} else {
					for (var i = 0; i < this.condition.Steps.length; i++) {
						if(this.taskId === this.condition.Steps[i].TaskItemID) {
							this.condition.Steps[i].Status = this.index
							this.condition.Steps[i].Mark = this.mark
							this.condition.Steps[i].Attributes = []
							this.condition.Steps[i].Attributes.push(att)
							page.setData({
								mode: JSON.stringify(this.condition),
								checked: true
							})
						}
					}
				}
				uni.navigateBack({
					delta: 3
				})
			}
		},
		onLoad(load) {
			if(undefined != load.att && "" != JSON.parse(load.att)) {
				this.attributesList = JSON.parse(load.att);
				//console.log("this.attributesList => " + JSON.stringify(this.attributesList))
			}
			if(undefined != load.mode && "" != JSON.parse(load.mode)) {
				this.mode= JSON.parse(load.mode)
				//console.log("this.mode => "+ JSON.stringify(this.mode))
			}
			if(undefined != load.taskId && "" != load.taskId) {
				this.taskId = load.taskId
				//console.log("this.taskId => "+ this.taskId)
			}
			if (undefined != load.condition && "" != JSON.parse(load.condition)) {
				this.condition= JSON.parse(load.condition)
				//console.log("this.condition => "+ JSON.stringify(this.condition));
				// 如果是之前录入过的重新检查需要重新赋值（boolean值传过来是字符串格式，需要转换）
				if (JSON.parse(load.checked)) {
					for (var i = 0; i < this.condition.Steps.length; i++) {
						if(load.taskId === this.condition.Steps[i].TaskItemID) {
							this.index = this.condition.Steps[i].Status
							var att = this.condition.Steps[i].Attributes[0]
							this.text = att.FieldName
							this.imageList = att.Datas
							this.mark = this.condition.Steps[i].Mark
						}
					}
				}
			}
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
