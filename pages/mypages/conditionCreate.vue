<template>
	<view>
		<view class="uni-input-group">
			<view class="uni-input-row-item">
				<label>施工状：</label>
				<input disabled="true" placeholder="请选择..." />
			</view>
			<view class="uni-input-row-item">
				<label>关注信息：</label>
				<textarea class="uni-input-textarea" placeholder="请说明..."></textarea>
			</view>
			<!-- <view class="uni-input-row-item">
				<label>施工状态(必填)：</label>
				<input disabled="true" placeholder="请选择..." />
			</view>
			<view class="uni-input-row-item">
				<label>关注信息：</label>
				<textarea class="uni-input-textarea" placeholder="请说明..."></textarea>
			</view>
			
			<view class="uni-input-row-item">
				<label>关注信息：</label>
				<textarea class="uni-input-textarea" placeholder="请说明..."></textarea>
			</view>
			<view class="uni-input-row-item">
				<label>现场影像：</label>
				<input disabled="true" :value="todayDate" @click="getDatePicker()" />
				<text class="iconfont" @click="getDatePicker">&#xe609;</text>
			</view>
			<view class="uni-input-row-item">
				<label>关注信息：</label>
				<textarea class="uni-input-textarea" placeholder="请说明..."></textarea>
			</view> -->
		</view>
		<button class="uni-common-mt" type="primary">确定</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
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

	 .uni-input-row-item label {
		width: 30%;
		right: 0upx;
		margin-right: 0upx;
		background: #DDDDDD;
	}

	/*.uni-input-textarea {
		padding-top: 20upx;
		height: 100upx;
	}*/

	.uni-input-row-item input,
	textarea {
		background-color: #EEEEEE;
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
