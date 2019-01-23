<template>
	<view class="page">
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse" v-for="(list,index) in partitionLists" :key="index" 
				:class="index === partitionLists.length - 1 ? 'uni-list-cell-last' : ''">
					<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" 
					:class="list.CanSelect ? 'uni-active' : ''"
					 @click="trigerCollapse(list.ProjectTypeCode, index)">
						{{list.Text}}
					</view>
					<!-- 二级列表 -->
					<view class="uni-list uni-collapse" :class="list.CanSelect ? 'uni-active' : ''">
						<block v-for="(item2,key2) in subItemLists[0]" :key="key2" 
							:class="key2 === subItemLists[0].length - 1 ? 'uni-list-cell-last' : ''">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" @click="trigerCollapse2(key2)">
								<view class="uni-list-cell-navigate uni-navigate-bottom"
								:class="item2.IsSite ? 'uni-active' : ''"> {{item2.name}} </view>
							</view>
							<!-- 三级列表 -->
							<view class="uni-list uni-collapse" :class="item2.IsSite ? 'uni-active' : ''">
								<block v-for="(item3,key3) in item2.items" :key="key3">
									<view class="uni-list-cell" hover-class="uni-list-cell-hover"
									:class="key3 === item2.items.length - 1 ? 'uni-list-cell-last' : ''">
										<view style="margin-left: 30upx;" class="uni-list-cell-navigate">{{item3.name}}</view>
									</view>
									<!-- 四级列表 
									<view class="uni-list uni-collapse" :class="item3.Sites.length ? 'uni-active' : ''">
										<block v-for="(item4,key4) in item3.Sites" :key="key4">
											<view class="uni-list-cell" hover-class="uni-list-cell-hover"
											@click="onSelectPoints(list.Name,item2.Name,item3.Name,item4)" :class="key4 === item3.Sites.length - 1 ? 'uni-list-cell-last' : ''">
												<view style="margin-left: 60upx;" class="uni-list-cell-navigate">{{item4.SiteName}}</view>
											</view>
										</block>
									</view>-->
								</block>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import service from '../../common/service.js'

	export default {
		data() {
			return {
				partitionLists: [],
				unitEngineeringLists: [],
				subItemLists: []
			}
		},
		methods: {
			onSelect: function() {
				uni.navigateTo({
					url: './conditionCreate'
				})
			},
			trigerCollapse(code, e) {
				// 根据分区获取工程类型下的分部分项
				this.subItemLists = []
				for (let i = 0; i < this.unitEngineeringLists.length; i++) {
					//console.log("code => " + code + "  --  data.code => " + this.unitEngineeringLists[i].Data.Code)
					if (code === this.unitEngineeringLists[i].Data.Code) {
						this.subItemLists.push(this.unitEngineeringLists[i].items);
					}
				}
				//console.log("subItemLists size " + this.subItemLists.length + " => " + JSON.stringify(this.subItemLists))
				for (let i = 0, len = this.partitionLists.length; i < len; ++i) {
					if (e === i) {
						this.partitionLists[i].CanSelect = !this.partitionLists[i].CanSelect;
					} else {
						this.partitionLists[i].CanSelect = false;
					}
				}
				//console.log("CanSelect => "+ JSON.stringify(this.partitionLists))
			},
			trigerCollapse2(e) {
				for (let i = 0, len = this.subItemLists[0].length; i < len; ++i) {
					if (e === i) {
						this.subItemLists[0][i].IsSite = !this.subItemLists[0][i].IsSite;
					} else {
						this.subItemLists[0][i].IsSite = false;
					}
				}
			}
		},
		onLoad() {
			// getPointLists获取工点下的所有分区
			this.partitionLists = service.getPointLists()
			//console.log("lists => "+ this.partitionLists.length+ " "+ JSON.stringify(this.partitionLists[0]))
			// getUnitEngineeringLists获取本地的所有单位工程
			this.unitEngineeringLists = service.getUnitEngineeringLists();
		}
	}
</script>

<style>

</style>
