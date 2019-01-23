<template>
	<view>
		<view class="a1"> 基本信息</view>
		<view class="uni-input-group">
			<view class="uni-input-row-item">
				<label>工点(必填)：</label>
				<input disabled="true" @click="selGongDian" :value="conditionName" placeholder="请选择工点..." />
			</view>
			<view class="uni-input-row-item">
				<label>填&nbsp;&nbsp;&nbsp;&nbsp;报&nbsp;&nbsp;&nbsp;人：</label>
				<input disabled="true" :value="username" />
			</view>
			<view class="uni-input-row-item">
				<label>施工状态：(必填)</label>
				<radio-group class="uni-flex" name="gender">
					<label>
						<radio checked="true" value="" />施工中</label>
					<label>
						<radio value="" />停工</label>
				</radio-group>
			</view>
			<view class="uni-input-row-item">
				<label>日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;期：</label>
				<input disabled="true" :value="todayDate" @click="getDatePicker()" />
				<text class="iconfont" @click="getDatePicker">&#xe609;</text>
				<date-picker v-model="showPicker" init="2018-12-24" type="date" @selected="onSelected" />
			</view>
			<view class="uni-input-row-item">
				<label>补充说明：</label>
				<textarea class="uni-input-textarea" placeholder="请说明..."></textarea>
			</view>
		</view>
		<button class="uni-common-mt" type="primary" @click="onNext">下一步</button>
	</view>
</template>
<script>
	import now from '../../common/date.js'
	import datePicker from '../../components/date-picker/date-picker.vue'
	import service from '../../common/service.js'
	
	export default {
		components: {
			datePicker
		},
		data() {
			return {
				todayDate: '',
				showPicker: false,
				conditionName:'',
				username: '',
				siteId: ''
			}
		},
		methods: {
			getDatePicker() {
				this.showPicker = true;
			},
			onSelected(date) {
				this.todayDate = date.value;
			},
			onNext:function(){
				if(undefined === this.conditionName || "" === this.conditionName) {
					uni.showToast({
						icon:'none',
						title:'请选择工点.'
					})
					return;
				}
				// 获取工点下分区
				uni.request({
					url: service.SERVICE_URL+ 'MCsp/GetSiteAreas',
					data: {
						siteid: this.siteId
					},
					success(succ) {
						if(succ.statusCode === 200) {
							//console.log(succ.data.length+ " => "+ JSON.stringify(succ.data))
							for (let i = 0; i < succ.data.length; i++) {
								succ.data[i].CanSelect = false;
							}
							service.setPointLists(succ.data)
							uni.navigateTo({
								//url: './conditionPartition'
								url: './conditionPartitionLeft'
							})
						} else {
							console.log(succ.statusCode)
							uni.showToast({
								icon: 'none',
								title: '获取分区失败.'
							});
						}
					},
					fail() {
						console.log('fail => 获取分区失败.')
					}
				})
			},
			selGongDian(){
				uni.navigateTo({
					url: './conditionSelect'
				})
			}
		},
		onLoad() {
			this.todayDate = now.date;
			this.username = service.getUsers()[0].account;
		},
		onShow() {
			var pages= getCurrentPages();
			var page = pages[pages.length - 1]
			if(undefined != page.data.point) {
				this.conditionName = page.data.point;
				//console.log(this.conditionName)
			}
			if(undefined != page.data.siteId) {
				this.siteId = page.data.siteId;
				//console.log(this.siteId)
			}
		}
	}
</script>

<style>
	.a1 {
		margin: 10upx 20upx;
	}

	.uni-input-row-item {
		position: relative;
		display: flex;
		flex-direction: row;
		font-size: 28upx;
		padding: 22upx 30upx;
	}

	.uni-input-textarea {
		padding-top: 20upx;
		height: 200upx;
	}

	.uni-input-row-item input,
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
		margin:10upx;
		background: #0FAEFF;
	}

	@font-face {
		font-family: 'iconfont';
		src: url('http://at.alicdn.com/t/font_1013928_wpmredcnffc.ttf') format('truetype');
	}

	.iconfont {
		font-family: "iconfont" !important;
		font-size: 22px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}
</style>
