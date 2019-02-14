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
				<view class="uni-card">
					<view class="uni-list">
						<view class="uni-list-cell uni-collapse" v-for="(list,index) in subItemLists" :key="index" :class="index === subItemLists.length - 1 ? 'uni-list-cell-last' : ''">
							<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.IsSite ? 'uni-active' : ''"
							 @click="trigerCollapse(list,index)">
								{{list.name}}
							</view>
							<view class="uni-list uni-collapse" :class="list.IsSite ? 'uni-active' : ''">
								<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.items" :key="key"
								 :class="key === list.items.length - 1 ? 'uni-list-cell-last' : ''" @click="toConditionCreate(item.id, list.Data.Attributes, item.checked)">
									<view class="uni-list-cell-navigate" :class="item.checked? 'item-checked':''"> {{item.name}} </view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import service from '../../common/service.js'

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
				mode: '',
				partitionValue: '',
				subID: '',
				subName: '',
				condition: ''
			}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			getSubItemLists(partition, index) {
				//console.log("partition => "+ JSON.stringify(partition))
				this.categoryActive = index;
				this.scrollTop = -this.scrollHeight * index;
				// 分区areaid => Value
				this.partitionValue = partition.Value;
				this.subItemLists = [];
				for (let i = 0; i < this.unitEngineeringLists.length; i++) {
					// 获取当前分区对应的工程类型下的分部分项
					//console.log("Code => "+ partition.ProjectTypeCode+ " -- Data.Code => "+this.unitEngineeringLists[i].Data.Code)
					if (partition.ProjectTypeCode === this.unitEngineeringLists[i].Data.Code) {
						this.subItemLists = this.unitEngineeringLists[i].items
						//console.log("this.subItemLists size "+this.subItemLists.length+ " => "+ JSON.stringify(this.subItemLists))
					}
				}
			},
			/**
			 * id：表示工序的id
			 * attributes：表示工序的att
			 */
			toConditionCreate(id, attributes, checked) {
				var step = { //JSON.stringify()
					AreaID: this.partitionValue, // 分区 => Value
					SubItemID: this.subID, //分部分项id
					SubName: this.subName, //分部分项名称
					TaskItemID: id, // 工程类型 -> 分部分项 -> 工序item:id
					Name: '', // 
					CspTaskItemID: '', //
					Status: '', // 表示施工状态共4种 => 数字
					Mark: '',
					Attributes: [] 
				}
				// 判断是新增工况录入还是复查工况录入
				if (undefined === this.condition || "" === this.condition) {
					this.mode.Steps.push(step)
				} else {
					// 复查工况没有检查过的工况
					if (!checked) {
						var count = 0;
						for (var i = 0; i < this.condition.Steps.length; i++) {
							if(id === this.condition.Steps[i].TaskItemID) {
								count = count+ 1;
							}
						}
						if(count <= 0) {
							this.condition.Steps.push(step)
						}
					}
				}
				uni.navigateTo({
					url: './conditionCreate?att=' + attributes + "&mode=" + JSON.stringify(this.mode) + '&condition=' + JSON.stringify(
						this.condition) + "&checked=" + checked + "&taskId=" + id
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
			}
		},
		onLoad: function(load) {
			this.height = uni.getSystemInfoSync().windowHeight;
			if (undefined != load.pointLists) {
				this.partitionLists = JSON.parse(load.pointLists);
				//console.log("partitionLists size "+ this.partitionLists.length+ " => "+ JSON.stringify(this.partitionLists))
			}
			// getUnitEngineeringLists获取本地的所有单位工程
			this.unitEngineeringLists = service.getUnitEngineeringLists();
			if (1 <= this.partitionLists.length) {
				// 初始化第一个分区的分部分项
				this.getSubItemLists(this.partitionLists[0], 0)
			}
			if (undefined != load.mode) {
				this.mode = JSON.parse(load.mode)
				//console.log("model => "+ JSON.stringify(this.mode))
			}
			if (undefined != load.condition) {
				this.condition = JSON.parse(load.condition)
				//console.log("this.condition => "+ JSON.stringify(this.condition));
				// 判断是否检查工况，根据checked添加背景色标识
				for (var list = 0; list < this.subItemLists.length; list++) {
					for (var item = 0; item < this.subItemLists[list].items.length; item++) {
						for (var step = 0; step < this.condition.Steps.length; step++) {
							//console.log("item.id => "+ this.subItemLists[list].items[item].id+ " --- steps.ID => "+ this.condition.Steps[step].TaskItemID);
							if (this.subItemLists[list].items[item].id === this.condition.Steps[step].TaskItemID) {
								this.subItemLists[list].items[item].checked = true;
							}
						}
					}
				}
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

	.active {
		color: #007AFF;
	}

	.item-checked {
		background: #E097B4;
	}
</style>
