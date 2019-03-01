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
						<textarea class="uni-input-textarea" v-model="list.Value" :value="list.Value" placeholder="请说明..."></textarea>
					</view>
				</view>
				<view v-show="'Upload' === list.DataType" class="uni-input-row-item">
					<label style="padding-top: 15upx;">{{list.DisplayName}}：</label>
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
					<label>{{list.DisplayName}}：</label>
					<view style="background-color: #EEEEEE;">▼</view>
					<picker mode="selector" @change="bindDropdownlist" :value="indexDropdownlist" :range="list.Datas">
						<view style="padding-right: 300upx;">{{list.Datas[indexDropdownlist]}}</view>
					</picker>
					<!-- <radio-group class="uni-flex" @change="bindDropdownlist">
						<block v-for="(multi, indexDropdownlist) in list.Datas" :key="indexDropdownlist">
							<label>
								{{ multi }}
								<radio :checked="indexDropdownlist==1?true:false" value="1" />
							</label>
						</block>
					</radio-group> -->
				</view>
				<view v-show="'MultiSelect' === list.DataType" class="uni-input-row-item">
					<label>{{list.DisplayName}}：</label>
					<checkbox-group class="uni-flex" @change="bindMultiSelect()">
						<block v-for="(multi, indexMulti) in list.Datas" :key="indexMulti">
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
				multiSelectList: [],
				mark: '',
				conditionMode: '',
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
			bindMultiSelect: function(e) {
				/* var items = multiList,
					values = e.detail.value;
				this.multiSelectList = [];
				for (var i = 0, lenI = items.length; i < lenI; ++i) {
					items[i].checked = false;
					for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
						if (items.indexOf(items[i]) == values[j]) {
							items[i].checked = true;
							this.multiSelectList.push(items[i])
							break
						}
					}
				} */
				//console.log("this.multiSelectList size "+ this.multiSelectList.length+ " => "+ JSON.stringify(this.multiSelectList));
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
				//console.log("this.attributesList => " + JSON.stringify(this.attributesList));
				var attArr = []
				if (0 < this.attributesList.length) {
					for (var i = 0; i < this.attributesList.length; i++) {
						var att = {
							FieldName: '', // 文本
							DisplayName: '',
							Value: '[]', // JSON.stringify() [{FileOldName:"",FileNewName:"",Url:"",FileSize:"",FileType:""}]
							DataType: ''
						}
						var attributes = this.attributesList[i];
						att.FieldName = attributes.FieldName;
						att.DisplayName = attributes.DisplayName;
						att.DataType = attributes.DataType
						if ("Text" === attributes.DataType) {
							att.Value = attributes.Value;
							attArr.push(att);
						}
						if ("Upload" === attributes.DataType) {
							att.Value = JSON.stringify(this.imageList); // 照片集合
							attArr.push(att);
						}
						if ("Dropdownlist" === attributes.DataType) {
							att.Value = this.indexDropdownlist;
							attArr.push(att);
						}
						if ("MultiSelect" === attributes.DataType) {
							att.Value = JSON.stringify(this.multiSelectList);
							attArr.push(att);
						}
					}
				}
				this.step.Status = parseInt(this.indexWorkState) + 1; // 施工状态
				this.step.Mark = this.mark // 备注
				this.step.Attributes = []
				this.step.Attributes = attArr;
				//console.log("this.step => "+ JSON.stringify(this.step));
				if (this.conditionMode.Steps.length <= 0) {
					this.conditionMode.Steps.push(this.step)
				} else {
					var countFenQu = 0,
						countGongXu = 0;
					for (var i = 0; i < this.conditionMode.Steps.length; i++) {
						var condition = this.conditionMode.Steps[i];
						// 添加时先判断分区
						if (condition.AreaID === this.step.AreaID) {
							countFenQu = countFenQu + 1;
							// 添加时后判断工序
							if (condition.TaskItemID === this.step.TaskItemID) {
								countGongXu += 1;
								this.conditionMode.Steps[i] = this.step;
							}
						}
					}
					//console.log("countFenQu => " + countFenQu + " --- countGongXu => " + countGongXu);
					if (countFenQu <= 0) {
						this.conditionMode.Steps.push(this.step)
					} else if (countGongXu <= 0) {
						this.conditionMode.Steps.push(this.step)
					}
				}
				//console.log("this.conditionMode => " + JSON.stringify(this.conditionMode))
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
			if (undefined != load.step && "" != load.step) {
				this.step = JSON.parse(load.step)
				// console.log("this.step => "+ load.step);
			}
			if (undefined != load.att && "" != JSON.parse(load.att)) {
				var attList = JSON.parse(load.att);
				for (var i = 0; i < attList.length; i++) {
					var attribute = {
						FieldName: '',
						DisplayName: '',
						DataType: '',
						Datas: '',
						SiteAreaID: '',
						Value: '',
					}
					var att = attList[i];
					// 重构attributes
					attribute.FieldName = att.FieldName;
					attribute.DisplayName = att.DisplayName;
					attribute.DataType = att.DataType;
					if ("Dropdownlist" === att.DataType) {
						attribute.Datas = JSON.parse(att.Datas).datasource;
					}
					if ("MultiSelect" === att.DataType) {
						attribute.Datas = JSON.parse(att.Datas).datasource
					}
					attribute.SiteAreaID = att.SiteAreaID;
					this.attributesList.push(attribute);
				};
				//console.log("this.attributesList => " + JSON.stringify(this.attributesList))
			}
			if (undefined != load.conditionMode && "" != JSON.parse(load.conditionMode)) {
				this.conditionMode = JSON.parse(load.conditionMode)
				//console.log("this.conditionMode => "+ JSON.stringify(this.conditionMode))
				if (JSON.parse(load.checked)) {
					for (var i = 0; i < this.conditionMode.Steps.length; i++) {
						var step = this.conditionMode.Steps[i];
						if (this.step.AreaID === step.AreaID && this.step.TaskItemID === step.TaskItemID) {
							this.indexWorkState = parseInt(step.Status) - 1
							this.mark = step.Mark;
							var attArr = step.Attributes;
							if (0 < attArr.length) {
								for (var i = 0; i < attArr.length; i++) {
									var att = attArr[i];
									for (var j = 0; j < this.attributesList.length; j++) {
										var attributes = this.attributesList[j];
										if (att.DisplayName === attributes.DisplayName) {
											attributes.Value = att.Value;
											if ("Upload" === attributes.DataType) {
												this.imageList = JSON.parse(att.Value)
											}
											if ("Dropdownlist" === attributes.DataType) {
												this.indexDropdownlist = parseInt(att.Value);
											}
											if ("MultiSelect" === attributes.DataType) {}
										}
									}
								}
							}
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
