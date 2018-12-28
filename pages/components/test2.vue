<template>
	<view>
		<view id="dle">
			<button @tap="cli">button</button>
		</view>
		<view>message:{{ message }}</view>
		<view v-for="(item, index) in students">
			<view class="persions">{{ index }} - {{item.name}}</view>
		</view>
		<view v-if="show">这里是条件展示的内容....</view>
		<!-- <view v-hidden="show">这里是条件展示的内容....</view> -->
		<span>Message: {{ message }}</span>
		<view>{{ number + 1 }}</view>
		<view>{{ show ? 'true' : 'false' }}</view>
		<view>{{ message.split('').reverse().join('') }}</view>
		<input type="text" v-model="txt" value="" />
		<view>{{ txt }}</view>
		<view :style="{color : col, fontSize: fs + 'px'}">:bing</view>
		<view :style="styObj">:bing</view>
	</view>
</template>

<script>
	import date from '../../common/date.js';

	export default {
		data: {
			title: 'test2',
			message: 'appMsg',
			students: [{
					name: "zhangs",
					age: 13
				},
				{
					name: "lis",
					age: 14
				}
			],
			show: false,
			number: 1,
			txt: '',
			val: '',
			col: 'red',
			fs: 30,
			styObj: {
				color: '#8F3E5E',
				fontSize: '13px'
			}

		},

		methods: {
			cli() {
				uni.showToast({
					title: 'button',
					mask: false,
					duration: 1500
				});
			},

			aaa() {
				var vm = new Vue({
					el: '#dle',
					data: {
						site: "自学Vue.js,",
						url: "www.xxxx.com",
						alexa: "100000"
					},
					methods: {
						details: function() {
							return this.site + "雄起！！";
						}
					}
				})
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
	@import后跟需要导入的外联样式表的相对路径，用;表示语句结束。*/
	/* @import "../../css/test.css"; */

	.uni-card {
		box-shadow: none;
	}

	.persions {
		width: 200px;
		line-height: 2.2em;
	}
</style>

<custom1>
	This could be e.g. documentation for the component.
</custom1>
