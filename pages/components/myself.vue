<template>
	<view class="page-body">
		<scroll-view class="nav-left" scroll-y :style="'height:'+height+'px'">
			<block v-for="(list,index) in categoryList" :key="index">
				<view class="nav-left-item" @click="categoryClickMain(list,index)" :class="index==categoryActive?'active':''">
					{{list.name}}
				</view>
			</block>
		</scroll-view>
		<scroll-view class="nav-right" scroll-y :scroll-top="scrollTop" @scroll="scroll" :style="'height:'+height+'px'"
		 scroll-with-animation>
			<view :id="index===0?'first':''" class="">
				<view v-if="departmentList.length">
					<view class="uni-list">
						<block v-for="(depar,index) in departmentList" :key="index">
							<view class="uni-list-cell uni-collapse">
								<view class="uni-list-cell-navigate uni-navigate-right" :class="depar.show ? 'uni-active uni-navigate-bottom' : ''"
								 @click="trigerCollapse(depar,index)">
									{{depar.name}} ({{depar.personnelItem.length}})
								</view>
								<view class="uni-collapse-content" :class="depar.show ? 'uni-active' : ''">
									<view class="uni-list">
										<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item, index1) in personnelItem" :key="index1">
											<view class="uni-media-list">
												<view class="uni-media-list-logo">
													<image :src="item.icon"></image>
												</view>
												<view class="uni-media-list-body">
													<view class="uni-media-list-text-top">{{item.name}}</view>
													<view class="uni-media-list-text-bottom uni-ellipsis">{{item.work}}</view>
												</view>
											</view>
										</view>
									</view>
								</view>
							</view>
						</block>
					</view>
				</view>
				<view v-if="personnelList.length">
					<view class="uni-list">
						<view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(person,index) in personnelList" :key="index">
							<view class="uni-media-list">
								<view class="uni-media-list-logo">
									<image :src="person.icon"></image>
								</view>
								<view class="uni-media-list-body">
									<view class="uni-media-list-text-top">{{person.name}}</view>
									<view class="uni-media-list-text-bottom uni-ellipsis">{{person.work}}</view>
								</view>
							</view>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import departmental from '../../common/departmental_structure_data.js';
	export default {
		data() {
			return {
				categoryList: [],
				personnelList: [],
				departmentList: [],
				personnelItem: [],
				height: 0,
				categoryActive: 0,
				scrollTop: 0,
				scrollHeight: 0
			}
		},
		methods: {
			scroll(e) {
				this.scrollHeight = e.detail.scrollHeight;
			},
			getCategory() {
				this.categoryList = departmental;
				this.personnelList = this.categoryList[0].personnel;
				this.departmentList = this.categoryList[0].department;
			},
			categoryClickMain(categroy, index) {
				this.categoryActive = index;
				this.personnelList = categroy.personnel;
				this.departmentList = categroy.department;
				this.scrollTop = -this.scrollHeight * index;
			},
			trigerCollapse(depar, e) {
				this.personnelItem = depar.personnelItem;
				for (let i = 0, len = this.departmentList.length; i < len; ++i) {
					if (e === i) {
						this.departmentList[i].show = !this.departmentList[i].show;
					} else {
						this.departmentList[i].show = false;
					}
				}
			}
		},
		onLoad: function() {
			this.getCategory();
			this.height = uni.getSystemInfoSync().windowHeight;
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
</style>
