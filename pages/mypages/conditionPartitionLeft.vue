<template>
	<view class="container">
		<view class="page-body">
			<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
				<view class="nav-left-item" @click="getSubItemLists(item, index)" :key="index" :class="index==categoryActive?'active':''"
				 v-for="(item,index) in partitionLists">
					{{item.Text}}
				</view>
			</scroll-view>
			<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'"
			 scroll-with-animation>
				<block v-for="(list,index) in subItemLists" :key="index">
					<view v-show="list.items.length">
						<view class="uni-list">
							<view class="uni-list-cell uni-list-cell-navigate" hover-class="uni-list-cell-hover"
							@click="!item.IsSite && toConditionCreate(item, list)" v-for="(item,key) in list.items" :key="key"
							:class="item.IsSite?'item-checked-bgc':''">
								<view class="title_body">
									<view class="title_site">{{item.name}}</view>
									<view class="title_cond">{{list.name}}</view>
								</view>
								<view v-show="item.checked?true:false">
									<uni-icon size="30" :type="'checkbox-filled'" :color="'#007aff'"></uni-icon>
								</view>
							</view>
						</view>
					</view>
				</block>
				<!-- <view class="uni-card">
					<view class="uni-list">
						<view class="uni-list-cell uni-collapse" v-for="(list,index) in subItemLists" :key="index" :class="index === subItemLists.length - 1 ? 'uni-list-cell-last' : ''">
							<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.IsSite ? 'uni-active' : ''"
							 @click="trigerCollapse(list,index)">
								{{list.name}}
							</view>
							<view class="uni-list uni-collapse" :class="list.IsSite ? 'uni-active' : ''">
								<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.items" :key="key"
								 :class="key === list.items.length - 1 ? 'uni-list-cell-last' : ''" @click="toConditionCreate(item, list.Data.Attributes)">
									<view class="uni-list-cell-navigate"> {{item.name}} </view>
									<view v-show="item.checked?true:false">
										<uni-icon size="30" :type="'checkbox-filled'" :color="'#007aff'"></uni-icon>
									</view>
								</view>
							</view>
						</view>
					</view>
				</view> -->
			</scroll-view>
		</view>
		<view class="nav">
			<button type="primary" class="nav-style" @click="toCondition('cancel')">取消</button>
			<button type="primary" class="nav-style" @click="toCondition('sure')">确定</button>
		</view>
	</view>
</template>

<script>
	import service from '../../common/service.js'
	import uniIcon from '../../components/search-date/uni-icon.vue'

	export default {
		data() {
			return {
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0,
				partitionLists: [],
				unitEngineeringLists: [],
				subItemLists: [],
				conditionMode: '',
				partitionValue: '',
				subID: '',
				subName: '',
				checked: false,
				listIndex: 0,
				checkSubmitTaskList: []
			}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			getSubItemLists(partition, index) {
				/* 
				 * partition 表示当前分区
				 */
				//console.log("partition => "+ JSON.stringify(partition))
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
				// 分区areaid => Value
				this.partitionValue = partition.Value;
				this.subItemLists = [];
				var count = 0;
				for (let i = 0; i < this.unitEngineeringLists.length; i++) {
					const unitEngineer = this.unitEngineeringLists[i];
					// 获取当前分区对应的工程类型下的分部分项
					//console.log("Code => "+ partition.ProjectTypeCode+ " -- Data.Code => "+this.unitEngineeringLists[i].Data.Code)
					if (partition.ProjectTypeCode === unitEngineer.Data.Code) {
						count += 1;
						service.setUnitEngineerItems(unitEngineer.items);
					}
				}
				if (0 >= count) {
					service.setUnitEngineerItems("");
				}
				this.subItemLists = service.getUnitEngineerItems();
				this.checkUnitEngineerings(partition.Value);
				//console.log("this.subItemLists => "+ JSON.stringify(this.subItemLists))
				this.checkSubItem(this.conditionMode, this.subItemLists, partition.Value);
			},
			// 判断是否检查工况，根据checked添加背景色标识
			checkSubItem: function(mode, subItemList, value) {
				/* 
				 * mode 表示构建的整体数据this.conditionMode
				 * subItemLsit 所有分部分项及工序
				 * value 分部分项id
				 */
				if (undefined != mode && "" != mode && 0 < mode.Steps.length) {
					for (var i = 0; i < mode.Steps.length; i++) {
						var step = mode.Steps[i];
						for (var j = 0; j < subItemList.length; j++) {
							var subItem = subItemList[j];
							// 判断当前分区下的分部分项是否被检查
							if (step.AreaID === value && step.SubItemID === subItem.id) {
								for (var k = 0; k < subItem.items.length; k++) {
									var item = subItem.items[k];
									if (step.TaskItemID === item.id) {
										item.checked = true;
									}
								}
							}
						}
					}
				}
			},
			toConditionCreate(item, list) {
				/**
				 * item：表示工序
				 * list 表示分部分项
				 * attributes：表示工序的att
				 */
				var attributes = list.Data.Attributes
				// 分部分项subitemid => id
				this.subID = list.id;
				// 分部分项名称subname
				this.subName = list.name;
				var step = { //JSON.stringify()
					AreaID: this.partitionValue, // 分区id => Value
					SubItemID: this.subID, //分部分项id
					SubName: this.subName, //分部分项名称
					TaskItemID: item.id, // 工程类型 -> 分部分项 -> 工序item.id
					Name: item.name, // 工序名称
					CspTaskItemID: '', //
					Status: '', // 表示施工状态共4种 => 数字
					Mark: '',
					Attributes: []
				}
				uni.navigateTo({
					url: './conditionCreate?att=' + attributes + "&conditionMode=" + JSON.stringify(this.conditionMode) +
						"&checked=" + item.checked + "&step=" + JSON.stringify(step)
				})
			},
			trigerCollapse(sub, e) {
				// 分部分项subitemid => id
				this.subID = sub.id;
				// 分部分项名称subname
				this.subName = sub.name;
				for (let i = 0, len = this.subItemLists.length; i < len; ++i) {
					if (e === i) {
						this.subItemLists[i].IsSite = !this.subItemLists[i].IsSite;
					} else {
						this.subItemLists[i].IsSite = false;
					}
				}
			},
			toCondition(sure) {
				var pages = getCurrentPages();
				var page = pages[pages.length - 3]; // pages.length表示所有页数 -1表示当前页面 -2表示上一个页面
				if ("cancel" === sure) {
					page.setData({
						button: "cancel"
					})
				} else {
					this.conditionMode.Time = new Date().getTime();
					if (JSON.parse(this.checked)) {
						var allList = service.getAllCondition()
						if (0 < allList.length) {
							allList.splice(this.listIndex, 1, this.conditionMode);
							service.removeAllCondition();
							for (var i = 0; i < allList.length; i++) {
								service.setAllCondition(allList[i]);
							}
						}
					} else {
						service.setAllCondition(this.conditionMode)
					}
					//console.log("this.condtitionMode => "+ JSON.stringify(this.conditionMode));
				}
				uni.navigateBack({
					delta: 2
				})
			},
			checkUnitEngineerings: function(areaid) {
				/* 
				 * areaid 分区id
				 */
				// 根据服务器和本地工况集合检索当前的工况下的工序，生成工序集合
				this.checkSubmitTaskList = service.getUnitEngineerings();
				//console.log("this.checkSubmitTaskList => "+ JSON.stringify(this.checkSubmitTaskList));
				var localList = service.getAllCondition();
				if (0 < localList.length) {
					for (var i = 0; i < localList.length; i++) {
						var local = localList[i];
						if (siteID === local.CurrentSiteID && 0 < local.Steps.length) {
							for (var j = 0; j < local.Steps.length; j++) {
								var demo = {
									AreaID : '',
									SubItemID : '',
									SubName : '',
									TaskItemID : '',
									StepID : '',
									Name : '',
									Status : ''
								}
								var step = local.Steps[j];
								demo.AreaID = step.AreaID;
								demo.SubItemID = step.SubItemID;
								demo.SubName = step.SubName;
								demo.TaskItemID = step.TaskItemID;
								demo.StepID = local.CurrentSiteID
								demo.Name = step.Name;
								demo.Status = step.Status;
								this.checkSubmitTaskList.push(demo);
							}
						}
					}
				}
				// 根据生成工序集合判断当前分区下的工序是否已检查，则背景色'灰'掉，而且不允许点击检查
				if (0 < this.checkSubmitTaskList.length) {
					for (var i = 0; i < this.checkSubmitTaskList.length; i++) {
						var taskItem = this.checkSubmitTaskList[i];
						if (0 < this.subItemLists.length) {
							for (var j = 0; j < this.subItemLists.length; j++) {
								var subItem = this.subItemLists[j];
								for (var k = 0; k < subItem.items.length; k++) {
									var item = subItem.items[k];
									item.IsSite = false;
									if (taskItem.AreaID === areaid && taskItem.TaskItemID === item.id) {
										item.IsSite = true;
									}
								}
							}
						}
					}
				}
			}
		},
		components: {
			uniIcon
		},
		onShow() {
			this.height = uni.getSystemInfoSync().windowHeight - 50;
			var pages = getCurrentPages();
			var page = pages[pages.length - 1]
			if (undefined != page.data.conditionMode && "" != page.data.conditionMode) {
				//console.log("data.conditionMode => "+ page.data.conditionMode);
				this.conditionMode = JSON.parse(page.data.conditionMode)
				page.data.conditionMode = undefined; //设置undefined防止重复添加
			}
			this.checkSubItem(this.conditionMode, this.subItemLists, this.partitionValue);
		},
		onLoad: function(load) {
			if (undefined != load.conditionMode && "" != load.conditionMode) {
				this.conditionMode = JSON.parse(load.conditionMode)
				//console.log("this.conditionMode => "+ JSON.stringify(this.conditionMode))
			}
			// getUnitEngineeringLists获取本地的所有单位工程
			this.unitEngineeringLists = service.getUnitEngineeringLists();
			if (undefined != load.pointLists && "" != load.pointLists) {
				this.partitionLists = JSON.parse(load.pointLists);
				//console.log("partitionLists size "+ this.partitionLists.length+ " => "+ JSON.stringify(this.partitionLists))
				if (0 < this.partitionLists.length) {
					// 初始化第一个分区的分部分项
					this.getSubItemLists(this.partitionLists[0], 0)
				}
			}
			if (undefined != load.checked && "" != load.checked) {
				this.checked = load.checked
				//console.log("this.checked => "+ this.checked);
			}
			if (undefined != load.listIndex && "" != load.listIndex) {
				this.listIndex = load.listIndex
				//console.log("this.listIndex => "+ load.listIndex);
			}
		}
	}
</script>

<style>
	.page-body {
		display: flex;
	}

	.nav {
		display: flex;
		width: 100%;
	}

	.nav-left {
		width: 30%;
	}

	.nav-left-item {
		height: 100upx;
		border-right: solid 1px #E0E0E0;
		border-bottom: solid 1px #E0E0E0;
		font-size: 30upx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nav-right {
		width: 70%;
		background-color: #FFFFFF;
	}

	.nav-right-item {
		width: 28%;
		height: 220upx;
		float: left;
		text-align: center;
		padding: 11upx;
		font-size: 28upx;
	}

	.nav-right-item image {
		width: 100upx;
		height: 100upx;
	}

	.nav-style {
		width: 90%;
		margin: 6upx;
	}

	.active {
		color: #007AFF;
	}

	.item-checked {
		background: #E097B4;
	}
	
	.title_body {
		display: flex;
		flex-direction: column;
	}
	
	.title_body .title_site {
		font-size: 35upx;
		padding: 0upx;
		line-height: 30upx;
	}
	
	.title_body .title_cond {
		font-size: 27upx;
		color: #919191;
		margin-top: 5upx;
		padding: 0upx;
		line-height: 30upx;
	}
	
	.item-checked-bgc {
		background: #CCCCCC;
	}
</style>
