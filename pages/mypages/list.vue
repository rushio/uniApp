<template>
	<view>
		<view class="uni-list">
			<view class="uni-list-cell" v-for="(item,index) in lists" :key="index">
				<view class="uni-list-cell-navigate uni-navigate-right">
					{{item}}
				</view>
			</view>
		</view>
		<button type="primary" @tap="push">添加元素</button>
		<button type="primary" @tap="pop">删除最后一个元素</button>
		<button type="primary" @tap="shift">删除第一个元素</button>
		<button type="primary" @tap="unshift">添加元素到第一个</button>
		<button type="primary" @tap="splice">插入、删除或替换数组的元素</button>
		<button type="primary" @tap="sort">升序</button>
		<button type="primary" @tap="reverse">降序</button>
		<button type="primary" @tap="filter">元素过滤</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				lists: ["察数组","的变异","方法，所以","它们也将会触发视","图更新。这些方法"]
			};
		},
		methods: {
			getRandom: function(){
				return Math.floor(Math.random()* 10000);
			},	
			push: function() {
				this.lists.push(this.getRandom());
			},
			pop: function() {
				this.lists.pop();
			},
			shift: function() {
				this.lists.shift();
			},
			unshift: function() {
				this.lists.unshift(this.getRandom());
			},
			splice: function() {
				/* 参数 描述
				index   必需。规定从何处添加/删除元素。该参数是开始插入和（或）删除的数组元素的下标，必须是数字。
				howmany 必需。规定应该删除多少元素。必须是数字，但可以是 "0"。如果未规定此参数，则删除从 index 开始到原数组结尾的所有元素。
				item1, ..., itemX 可选。要添加到数组的新元素 */
				this.lists.splice(1, 2, this.getRandom());
			},
			sort: function(){
				this.lists.sort();     
			},
			reverse:function(){
				this.lists.reverse();
			}
		}
	}
</script>

<style>
	button {
		margin: 0px 20upx;
	}
</style>
