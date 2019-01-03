<template>
	<view class="uni-tab-bar">
		<scroll-view id="tab-bar" class="uni-swiper-tab scroll-view-center" scroll-x :scroll-left="scrollLeft">
			<view v-for="(tab,index) in tabBars" :key="tab.id" :class="['swiper-tab-list',tabIndex==index ? 'active' : '']" :id="tab.id"
			 :data-current="index" @tap="tapTab">{{tab.name}}
				<view :class="[tabIndex==index ? 'menu-one-act' : 'menu-one']">
					<view class="menu-one-bottom-color"></view>
				</view>
			</view>
		</scroll-view>
		<swiper :current="tabIndex" class="swiper-box" duration="300" @change="changeTab">
			<swiper-item>
				<view class="swiper-item-st">
					<image class="empty-content" src="../../static/img/empty_content.png"></image>
					<view><text>暂无内容</text></view>
				</view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper-one-list" scroll-y="true">
					<block v-for="(item, index) in already_done_items" :key="index">
						<view class="uni-card" hover-class="uni-list-cell-hover" @click="toFormInfo(['正文','流程'])">
							<view class="uni-card-header uni-card-media">
								<image class="uni-card-media-logo" src="../../static/img/uni@2x.png"></image>
								<view class="uni-card-media-body">
									<text class="uni-card-media-text-top">{{item.title}}</text>
									<text class="uni-card-media-text-bottom">{{item.name}} {{item.date}}</text>
								</view>
							</view>
							<view class="uni-card-footer">{{item.reply}}</view>
						</view>
					</block>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper-one-list" scroll-y="true" @scrolltolower="loadOver">
					<block v-for="(item, index) in already_issued_item" :key="index">
						<view class="uni-card" hover-class="uni-list-cell-hover" @click="toFormInfo(['表单','流程'])">
							<view class="uni-card-header uni-card-media">
								<image class="uni-card-media-logo" src="../../static/img/uni@2x.png"></image>
								<view class="uni-card-media-body">
									<text class="uni-card-media-text-top">{{item.title}}</text>
									<text class="uni-card-media-text-bottom">{{item.name}} {{item.date}}</text>
								</view>
							</view>
							<view class="uni-card-footer">{{item.reply}}</view>
						</view>
					</block>
				</scroll-view>
			</swiper-item>
			<swiper-item>
				<scroll-view class="swiper-one-list" scroll-y="true" @scrolltolower="loadOver">
					<block v-for="(item, index) in tobe_issued_item" :key="index">
						<view class="uni-card" hover-class="uni-list-cell-hover" @click="toFormInfo(['表单','流程'])">
							<view class="uni-card-header uni-card-media">
								<image class="uni-card-media-logo" src="../../static/img/uni@2x.png"></image>
								<view class="uni-card-media-body">
									<text class="uni-card-media-text-top">{{item.title}}</text>
									<text class="uni-card-media-text-bottom">{{item.name}} {{item.date}}</text>
								</view>
							</view>
							<view class="uni-card-footer">{{item.reply}}</view>
						</view>
					</block>
				</scroll-view>
			</swiper-item>
		</swiper>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				scrollLeft: 0,
				isClickChange: false,
				tabBars: [{
					name: '待办工作',
					id: 'daiban'
				}, {
					name: '已办工作',
					id: 'yiban'
				}, {
					name: '待发工作',
					id: 'daifa'
				}, {
					name: '已发工作',
					id: 'yifa'
				}],
				tabIndex: 0,
				already_done_items: [{
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					title: '消防演习之灭火器和消防水管实战演练',
					name: '许明',
					date: '2018-01-30 15:30',
					reply: '共有111条回复'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					title: '睿语考勤通知',
					name: '徐燕',
					date: '2018-05-23 9:43',
					reply: '共有7条回复'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					title: '邮箱维护通知',
					name: '赵金鹏',
					date: '2018-01-31 14:04',
					reply: '共有114条回复'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					title: '"我心中的企业"征文启事',
					name: '徐燕',
					date: '2017-09-19 13:26',
					reply: '共有19条回复'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					title: '新员工入职培训计划表',
					name: '马海松',
					date: '2017-06-19 16:19',
					reply: '共有5条回复'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					title: '个人通讯录修改通知',
					name: '徐燕',
					date: '2017-09-25 11:23',
					reply: '共有16条回复'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					title: '试用期考核表',
					name: '马海松',
					date: '2017-09-11 11:24',
					reply: '共有4条回复'
				}, {
					icon: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/uni@2x.png',
					title: '试用期考核表',
					name: '马海松',
					date: '2017-08-09 11:50',
					reply: '共有3条回复'
				}],
				tobe_issued_item: [{
					icon: '',
					title: '员工请假单（新）',
					name: '杨坤',
					date: '今天 15:43',
					reply: '共有0条回复'
				}, {
					icon: '',
					title: '员工请假单（新）',
					name: '杨坤',
					date: '2018-11-19 09:24',
					reply: '共有2条回复'
				}, {
					icon: '',
					title: '员工请假单（新）',
					name: '杨坤',
					date: '2018-11-15 09:24',
					reply: '共有2条回复'
				}, {
					icon: '',
					title: '员工请假单（新）',
					name: '杨坤',
					date: '2018-11-13 09:52',
					reply: '共有2条回复'
				}],
				already_issued_item: [{
					icon: '',
					title: '员工请假单（新）',
					name: '杨坤',
					date: '2018-11-15 09:24',
					reply: '共有2条回复'
				}, {
					icon: '',
					title: '员工请假单（新）',
					name: '杨坤',
					date: '2018-11-13 09:52',
					reply: '共有2条回复'
				}, {
					icon: '',
					title: '员工刷卡异常单',
					name: '杨坤',
					date: '2017-07-28 18:27',
					reply: '共有2条回复'
				}, {
					icon: '',
					title: '员工刷卡异常单',
					name: '杨坤',
					date: '2018-06-23 09:58',
					reply: '共有2条回复'
				}]

			}
		},
		methods: {
			async tapTab(e) { //点击tab-bar
				if (this.tabIndex === e.target.dataset.current) {
					return false;
				} else {
					this.isClickChange = true;
					this.tabIndex = e.target.dataset.current
				}
			},
			async changeTab(e) {
				let index = e.target.current;
				if (this.isClickChange) {
					this.tabIndex = index;
					this.isClickChange = false;
					return;
				}
				this.isClickChange = false;
				this.tabIndex = index; //一旦访问data就会出问题
			},
			loadOver: function() {

			},
			toFormInfo: function(flowArr){
				uni.navigateTo({
					url:'../components/form-flow?flow='+ flowArr
				})
			}
		}
	}
</script>
<style>
	.scroll-view-center {
		margin-top: 20upx;
		text-align: center;
	}

	.empty-content {
		width: 55px;
		height: 55px;
	}

	.swiper-item-st {
		text-align: center;
		padding-top: 200px;
	}
	
	.uni-card-footer:before {
		position: absolute;
		top: 0;
		right: 0;
		left: 0;
		height: 0upx;
		content: '';
		-webkit-transform: scaleY(.5);
		transform: scaleY(.5);
		background-color: #c8c7cc;
	}
	
	.menu-one-act {
		margin: 15upx 24upx 0upx 24upx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		background: #007AFF;
	}

	.menu-one {
		margin: 15upx 24upx 0upx 24upx;
		position: relative;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.menu-one-bottom-color {
		width: 100%;
		height: 5upx;
	}

	.swiper-one-list {
		height: 100%;
		width: 100%;
	}
	
	.uni-list-cell-hover {
		background-color: #F5F7F8;
	}
</style>
