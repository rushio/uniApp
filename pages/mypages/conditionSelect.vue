<template>
	<view class="page">
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse" v-for="(list,index) in lists" :key="index" 
				:class="index === lists.length - 1 ? 'uni-list-cell-last' : ''">
					<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" 
					:class="list.show ? 'uni-active' : ''" @click="trigerCollapse(list.title, index)">
						{{list.title}}
					</view>
					
					<view class="uni-list uni-collapse" :class="list.show ? 'uni-active' : ''">
                        <block v-for="(item,key) in list.item" :key="key">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" 
							@click="trigerCollapse2(item.title, key)"
							:class="key === list.item.length - 1 ? 'uni-list-cell-last' : ''">
								<view class="uni-list-cell-navigate uni-navigate-bottom"> {{item.title}}	</view>
							</view>
							
							<view class="uni-list uni-collapse" :class="item.show ? 'uni-active' : ''">
								<view class="uni-list-cell" v-for="(item2,key2) in item.item" :key="key2"
								:class="key2 === item.item.length - 1 ? 'uni-list-cell-last' : ''">
									<view class="uni-list-cell-navigate" hover-class="uni-list-cell-hover"
									@click="onSelectPoints(item2)">{{item2}}</view>
								</view>
							</view>
						</block>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				luxian:'',
				bianduan:'',
				lists: [{
						title: "路线1",
						show: false,
						item: [{
							title: "标段1",
							show: false,
							item: ["工点1", "工点2", "工点3"]
						}, {
							title: "标段2",
							show: false,
							item: ["工点1"]
						}]
					},
					{
						title: "路线2",
						show: false,
						item: [{
							title: "标段1",
							show: false,
							item: ["工点1", "工点2", "工点3"]
						}, {
							title: "标段2",
							show: false,
							item: ["工点1", "工点2"]
						}]
					},
					{
						title: "路线3",
						show: false,
						item: []
					}
				]
			}
		},
		methods: {
			onSelectPoints: function(point){
				var gongdian= this.luxian + "-" + this.bianduan + "-" + point;
				var pages = getCurrentPages();
				var page = pages[pages.length - 2];
				page.setData({
					point: gongdian 
				})
				uni.navigateBack({
					delta:page
				})
			},
			trigerCollapse(title, e) {
				this.luxian = title;
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					if (e === i) {
						this.lists[i].show = !this.lists[i].show;
					} else {
						this.lists[i].show = false;
					}
				}
			},
			trigerCollapse2(title, key) {
				this.bianduan = title;
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					for (let j = 0, len = this.lists[i].item.length; j < len; ++j) {
						if (key === j) {
							this.lists[i].item[j].show = !this.lists[i].item[j].show;
						} else {
							this.lists[i].item[j].show = false;
						}
					}
				}
			}
		}
	}
</script>

<style>

</style>
