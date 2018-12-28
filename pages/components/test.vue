<template>
	<view class="login">
		<!-- 静态upx赋值生效style="width:200upx" | 动态绑定不生效:style="{width:winWidth + 'upx;'} -->
		<view class="half-width" :style="{width:halfWidth}">半屏宽度</view>
		<view class="status_bar">
			<view class="top_view"></view>
		</view>
		<view class="content">Dis Hello</view>
		
		<view>固定值 uni-app 中以下组件的高度是固定的，不可修改：
		导航栏高度固定为 44px
		tabBar 高度固定为 56px</view>
		
		<!-- 但写在 @event 里面的表达式是都支持的，因为这部分的计算放在了 vdom 里面 -->
		<view v-for="(item, index) in list" :key ="index">
			<view @click="clickHandle(item, index, $event)">{{item.value}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		
		/* page() {
			var pages= getCurrentPages();
			var page= pages[pages.lenght- 1];
			// #ifdef APP-PLUS
			var currentWebView= page.$getAppWebview();
			console.log(currentWebView.id);
			currentWebView.setStyle({
				titleNView:{
					titleText: "text";
				}
			});
			// #endif
		} */
		
		computed:{
			halfWidth(){
				return uni.upx2px(750 / 2) + 'px';
			}
		}
		
	}
	

</script>

<style>
	/* 
	使用@import语句可以导入外联样式表
	@import后跟需要导入的外联样式表的相对路径，用;表示语句结束。
	例如：@import "../../common/uni.css"; */
	
	.half-width {
		background-color: #8F8F94;
	}
	
	.login{
		flex:1;
		flex-direction:column;
	}
	
	/* uni-app 提供内置 CSS 变量 var(--status-bar-height) ，表示状态栏的高度。 */
	.status_bar{
		height: var(--status-bar-height);
		width: 100%;
	}
	.top_view{
		height: var(--status-bar-height);
		width: 100%;
		position: fixed;
		top:0;
	}
	.content{
		justify-content: center;
		align-items: center;
	}
</style>
