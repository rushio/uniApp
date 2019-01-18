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
				<input disabled="true" value="张三" />
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
	
	export default {
		components: {
			datePicker
		},
		data() {
			return {
				todayDate: '',
				showPicker: false,
				conditionName:''
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
				if(this.conditionName === undefined || this.conditionName === null) {
					uni.showToast({
						icon:'none',
						title:'请选择工点.'
					})
					return;
				}
				uni.navigateTo({
					url: './condition-partition'
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
		},
		onShow() {
			var pages= getCurrentPages();
			var page = pages[pages.length - 1]
			if(page.data.point != "") {
				this.conditionName = page.data.point;
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
