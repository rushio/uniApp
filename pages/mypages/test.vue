<template>
	<view>
		<!-- random随机数，下面示例意思是 随机生成一个数字在0-10000之间 -->
		<view>随机数: {{random}}</view>
		<button @tap="btnClick">随机刷新</button>

		<view>message: {{ message }}</view>
		<!-- <span>Message: {{ message }}</span> -->
		<view>random + 1 = {{ random + 1 }}</view>
		<view>show的三元运算符: {{ show ? 'true' : 'false' }}</view>
		<view>message的reverse用法: {{ reverseMsg }}</view>

		<view v-for="(item, index) in students" :key="index">
			<view class="persions">{{ index }} - {{item.name}},{{item.age}}</view>
		</view>
		<view v-if="show">这里是v-if条件show = {{show}}展示的内容....</view>
		<view v-else>这里是v-else条件show = {{show}}展示的内容....</view>
		<!-- <view v-hidden="show">这里是条件展示的内容....</view> -->

		<input style="border: 1upx solid #808080;margin: 1upx;" type="text" v-model="model" value="" placeholder="这是个输入框." />
		<view style="color: #E80080;">{{ model }}</view>
		<view :style="{color : txtColor, fontSize: txtSize + 'px'}">:bind绑定内联样式style对象语法</view>
		<view :style="styObj">:bind绑定style样式对象</view>
		<view :style="[]">:bind绑定数组语法style样式</view>

	</view>
</template>

<script>
	import date from '../../common/date.js';

	export default {
		data() {
			return {
				title: 'test2',
				random: 1,
				message: 'hello',
				students: [{
						name: "zhangs",
						age: 13
					},
					{
						name: "lis",
						age: 14
					}
				],
				show: true,
				model: '',
				txtColor: '#793BA2',
				txtSize: 24,
				styObj: {
					color: 'red',
					fontSize: '13px'
				}
			}
		},
		computed: {
			// 计算属性
			reverseMsg: function() {
				return this.message.split('').reverse().join('');
			}
		},
		watch: {
			// 侦听属性
		},
		methods: {
			btnClick() {
				this.random = Math.floor(Math.random() * 10000);
				this.show = this.random % 2 === 0 ? true : false;
				uni.showToast({
					icon: 'none',
					title: '刷新完成',
					duration: 1500
				});
			}
		},
		onLoad: () => {
			console.log(date.now);
		}
	}
</script>

<style>
	/* 样式导入
	使用@import语句可以导入外联样式表
	@import后跟需要导入的外联样式表的相对路径，用;表示语句结束。
	@import "../../css/test.css"; */

	.uni-card {
		box-shadow: none;
	}

	.persions {
		width: 200px;
		line-height: 2.2em;
	}

	button {
		margin: 2px;
	}

	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		text-align: center;
		/* align-items: flex-end; */
	}

	.color-item-class {
		width: 80px;
		height: 50px;
		margin: 3px;
		background: #E6E6E6;
	}

	.test-view-body {
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
</style>
