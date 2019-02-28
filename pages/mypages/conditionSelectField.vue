<template>
	<view class="page">
		<view class="uni-card">
			<view class="uni-list">
				<view class="uni-list-cell uni-collapse" v-for="(list,index) in lists" :key="index" 
				:class="index === lists.length - 1 ? 'uni-list-cell-last' : ''">
					<view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" 
					:class="list.Level ? 'uni-active' : ''"
					 @click="trigerCollapse(index)">
						{{list.Name}}
					</view>
					<!-- 二级列表 -->
					<view class="uni-list uni-collapse" :class="list.Level ? 'uni-active' : ''">
						<block v-for="(item2,key2) in list.Children" :key="key2" 
							:class="key2 === list.Children.length - 1 ? 'uni-list-cell-last' : ''">
							<view class="uni-list-cell" hover-class="uni-list-cell-hover" 
							@click="trigerCollapse2(key2)">
								<view class="uni-list-cell-navigate uni-navigate-bottom"
								:class="item2.Level ? 'uni-active' : ''"> {{item2.Name}} </view>
							</view>
							<!-- 三级列表 -->
							<view class="uni-list uni-collapse" :class="item2.Level ? 'uni-active' : ''">
								<block v-for="(item3,key3) in item2.Children" :key="key3">
									<view class="uni-list-cell" hover-class="uni-list-cell-hover"
									@click="onSelectPoints(list.Name,item2.Name,item3)" :class="key3 === item2.Children.length - 1 ? 'uni-list-cell-last' : ''">
										<view style="margin-left: 30upx;" class="uni-list-cell-navigate">{{item3.SiteName}}</view>
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
				lists: []
			}
		},
		methods: {
			onSelectPoints: function(name,name2,site) {
				var dian = name + ">" + name2 + ">" + site.SiteName;
				var pages = getCurrentPages();
				var page = pages[pages.length - 2]; // pages.length表示所有页数 -1表示当前页面 -2表示上一个页面
				page.setData({
					point: dian,
					siteId: site.SiteID
				})
				uni.navigateBack({
					delta: page
				})
			},
			trigerCollapse(e) {
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					if (e === i) {
						this.lists[i].Level = !this.lists[i].Level;
					} else {
						this.lists[i].Level = false;
					}
				}
			},
			trigerCollapse2(key) {
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					for (let j = 0, len = this.lists[i].Children.length; j < len; ++j) {
						if (key === j) {
							this.lists[i].Children[j].Level = !this.lists[i].Children[j].Level;
						} else {
							this.lists[i].Children[j].Level = false;
						}
					}
				}
			},
			trigerCollapse3(key) {
				for (let i = 0, len = this.lists.length; i < len; ++i) {
					for (let j = 0, len = this.lists[i].Children.length; j < len; ++j) {
						for (let k = 0, len = this.lists[j].Children.length; k < len; ++k) {
							if (key === k) {
								this.lists[i].Children[j].Children[k].Level = !this.lists[i].Children[j].Children[k].Level;
							} else {
								this.lists[i].Children[j].Children[k].Level = false;
							}
						}
					}
				}
			}
		},
		onLoad() {
			var list = service.getPoints();
			for (let i = 0; i < list.length; i++) {
				var project = list[i];
				project.Level = false;
				var chsi = project.Children.length>0?project.Children:project.Sites;
				project.Children = chsi;
				for (let j = 0; j < chsi.length; j++) {
					var child = chsi[j];
					child.Level = false;
					var chsi2 = child.Children.length>0?child.Children:child.Sites;
					child.Children = chsi2;
					/* for (let k = 0; k < chsi2.length; k++) {
						chsi2[k].Level = false;
					} */
				}
			}
			this.lists = list;
			//console.log(JSON.stringify(this.lists[0]))
		}
	}
</script>

<style>

</style>
