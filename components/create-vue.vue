<template name="createVue">
	<view>
		<view>{{ msg }}</view>
	</view>
</template>

<script>
	export default {
		name: '自定义组件',
		//属性
		props: {
			crt: {
				type: String, //属性类型
				value: "值"
			} // ,...
		},
		//组件生命周期
		created: function(e) {

		},
		data() {
			return {
				msg: "创建自定义组件";
			};
		},
		methods: {
			函数名称: function(obj) {

			},
		}
	}
</script>

<style>
	/* 
 1、引用组件
import 组件名称 from "../../components/组件名.vue";
2、注册组件
export default{
	components:{
		组件名称
	},
}
3、在试图模板中使用组件
<组件名称 组件属性="对应的值"></组件名称>*/
</style>
