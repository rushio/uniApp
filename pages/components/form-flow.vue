<template>
	<view>
		<view class="uni-padding-wrap uni-common-mt">
			<view class="segmented-control" :class="styleType" style="border-color: #007aff">
				<view v-for="(item, index) in items" class="segmented-control-item"	:key="index" :class="styleType" 
				:style="index === current ? activeStyle : itemStyle" @click="onClickItem(index)">
					{{item}}
				</view>
			</view>
		</view>
		<view class="content">
			<view v-show="current === 0">
				111
			</view>
			<view v-show="current === 1">
				选项卡2的内容
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				items: [
					'表单',
					'流程'
				],
				current: 0,
				activeColor: '#007aff',
				styleType: 'button'
			}
		},
		computed:{
			activeStyle() {
				return 'color: #fff;border-color: #007aff;background-color: #007aff';
			},
			itemStyle() {
				return 'color: #007aff;border-color: #007aff;';
			}
		},
		components: {},
		methods: {
			onClickItem(index) {
				if (this.current !== index) {
					this.current = index;
				}
			}
		}
	}
</script>

<style>
	.content {
		display: flex;
		justify-content: center;
		align-items: center;
		height: 300upx;
		text-align: center;
	}

	.segmented-control {
		display: flex;
		flex-direction: row;
		justify-content: center;
		width: 75%;
		font-size: 28upx;
		border-radius: 10upx;
		box-sizing: border-box;
		margin: 0 auto;
		overflow: hidden;
	}

	.segmented-control.button {
		border: 2upx solid;
	}

	.segmented-control-item {
		flex: 1;
		text-align: center;
		line-height: 60upx;
		box-sizing: border-box;
	}

	.segmented-control-item.button {
		border-left: 1upx solid;
	}

	.segmented-control-item:first-child {
		border-left-width: 0;
	}

</style>
