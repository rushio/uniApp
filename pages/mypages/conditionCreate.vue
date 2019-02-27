<template>
	<view>
		<view class="uni-input-group">
			<view class="uni-input-row-item">
				<label>施工状态：</label>
				<view style="background-color: #EEEEEE;">▼</view>
				<picker mode="selector" @change="bindWorkState" :value="indexWorkState" :range="workState">
					<view style="padding-right: 300upx;">{{workState[indexWorkState]}}</view>
				</picker>
			</view>
			<block v-for="(list,index) in attributesList" :key="index">
				<view v-show="'Text' === list.DataType">
					<view class="uni-input-row-item">
						<label>{{list.DisplayName}}：</label>
						<textarea class="uni-input-textarea" v-model="text" :value="text" placeholder="请说明..."></textarea>
					</view>
				</view>
				<view v-show="'Upload' === list.DataType" class="uni-input-row-item">
					<label style="padding-top: 15upx;">现场影像：</label>
					<view class="uni-uploader__files">
						<block v-for="(image,imgKey) in imageList" :key="imgKey">
							<view class="uni-uploader__file">
								<image class="uni-uploader__img" :src="image" :data-src="image" @tap="previewImage"></image>
							</view>
						</block>
						<view class="uni-uploader__input-box">
							<view class="uni-uploader__input" @tap="bindPicture"></view>
						</view>
					</view>
				</view>
				<view v-show="'Dropdownlist' === list.DataType" class="uni-input-row-item">
					<label>下拉列表：</label>
					<view style="background-color: #EEEEEE;">▼</view>
					<picker mode="selector" @change="bindDropdownlist" :value="indexDropdownlist" :range="Dropdownlist">
						<view style="padding-right: 300upx;">{{Dropdownlist[indexDropdownlist]}}</view>
					</picker>
					<!-- <radio-group class="uni-flex" @change="bindDropdownlist">
						<block v-for="(multi, indexDropdownlist) in Dropdownlist" :key="indexDropdownlist">
							<label>
								{{ multi }}
								<radio :checked="indexDropdownlist==1?true:false" value="1" />
							</label>
						</block>
					</radio-group> -->
				</view>
				<view v-show="'MultiSelect' === list.DataType" class="uni-input-row-item">
					<label>多选：</label>
					<checkbox-group class="uni-flex" @change="CheckBoxMultiSelect">
						<block v-for="(multi, indexMulti) in MultiSelect" :key="indexMulti">
							<view>{{multi}}</view>
							<checkbox :value="indexMulti"></checkbox>
						</block>
					</checkbox-group>
				</view>
			</block>
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
				indexWorkState: 0,
				workState: ['施工中', '停工', '已竣工', '未开工'],
				imageList: [],
				indexDropdownlist: 0,
				Dropdownlist: [],
				MultiSelect: [],
				mark: '',
				text: '',
				conditionMode: '',
				taskId: '',
				step: ''
			};
		},
		methods: {
			bindWorkState: function(e) {
				//'picker发送选择改变，携带值为' e.target.value
				//console.log("Statevalue => " + e.target.value)
				this.indexWorkState = e.target.value
			},
			bindDropdownlist: function(e) {
				this.indexDropdownlist = e.target.value
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
									success: (res) => {
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
						success: (res) => {
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
				var attArr = []
				if (0 < this.attributesList.length) {
					for (var i = 0; i < this.attributesList.length; i++) {
						var att = {
							FieldName: '', // 文本
							Value: '[]', // JSON.stringify() [{FileOldName:"",FileNewName:"",Url:"",FileSize:"",FileType:""}]
							DataType: ''
						}
						var attributes = this.attributesList[i];
						//console.log("attributes => " + JSON.stringify(attributes));
						att.FieldName = attributes.FieldName;
						att.DataType = attributes.DataType
						if ("Text" === attributes.DataType) {
							att.Value = this.text
							attArr.push(att)
						}
						if ("Upload" === attributes.DataType) {
							att.Value = JSON.stringify(this.imageList); // 照片集合
							attArr.push(att)
						}
						if ("Dropdownlist" === attributes.DataType) {}
						if ("MultiSelect" === attributes.DataType) {}
					}
				}
				this.step.Status = parseInt(this.indexWorkState) + 1; // 施工状态
				this.step.Mark = this.mark // 备注
				this.step.Attributes = []
				this.step.Attributes = attArr;
				if (this.conditionMode.Steps.length <= 0) {
					this.conditionMode.Steps.push(this.step)
				} else {
					var count = 0;
					for (var i = 0; i < this.conditionMode.Steps.length; i++) {
						if (this.taskId === this.conditionMode.Steps[i].TaskItemID) {
							count = count + 1;
							this.conditionMode.Steps[i].Attributes = []
							this.conditionMode.Steps[i].Attributes = attArr;
						}
					}
					if (count <= 0) {
						this.conditionMode.Steps.push(this.step)
					}
				}
				//console.log("this.conditionMode => "+ JSON.stringify(this.conditionMode))
				var pages = getCurrentPages();
				var page = pages[pages.length - 2]; // pages.length表示所有页数 -1表示当前页面 -2表示上一个页面
				page.setData({
					conditionMode: JSON.stringify(this.conditionMode)
				})
				uni.navigateBack({
					delta: 1
				})
			}
		},
		onLoad(load) {
			if (undefined != load.att && "" != JSON.parse(load.att)) {
				this.attributesList = JSON.parse(load.att);
				//console.log("this.attributesList => " + JSON.stringify(this.attributesList))
				for (var i = 0; i < this.attributesList.length; i++) {
					var att = this.attributesList[i];
					if ("Dropdownlist" === att.DataType) {
						this.Dropdownlist = JSON.parse(att.Datas).datasource;
					}
					if ("MultiSelect" === att.DataType) {
						this.MultiSelect = JSON.parse(att.Datas).datasource
					}
				};
			}
			if (undefined != load.conditionMode && "" != JSON.parse(load.conditionMode)) {
				this.conditionMode = JSON.parse(load.conditionMode)
				//console.log("this.conditionMode => "+ JSON.stringify(this.conditionMode))
				if (JSON.parse(load.checked)) {
					for (var i = 0; i < this.conditionMode.Steps.length; i++) {
						var step = this.conditionMode.Steps[i];
						if (load.taskId === step.TaskItemID) {
							this.indexWorkState = parseInt(step.Status) - 1
							this.mark = step.Mark
							var attArr = step.Attributes;
							if(0 < attArr.length) {
								for (var i = 0; i < attArr.length; i++) {
									//console.log("DataType => "+ attArr[i].DataType);
									var att = attArr[i];
									if ("Text" === att.DataType) {
										this.text = att.Value
									}
									if ("Upload" === att.DataType) {
										this.imageList = JSON.parse(att.Value)
									}
									if ("Dropdownlist" === att.DataType) {}
									if ("MultiSelect" === att.DataType) {}
								}
							}
						}
					}
				}
			}
			if (undefined != load.taskId && "" != load.taskId) {
				this.taskId = load.taskId
				//console.log("this.taskId => "+ this.taskId)
			}
			if (undefined != load.step && "" != load.step) {
				this.step = JSON.parse(load.step)
				// console.log("this.step => "+ load.step);
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
