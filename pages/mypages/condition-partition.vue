<template>
    <view class="page">
        <view class="uni-card">
            <view class="uni-list">
                <view class="uni-list-cell uni-collapse" v-for="(list,index) in lists" :key="index" :class="index === lists.length - 1 ? 'uni-list-cell-last' : ''">
                    <view class="uni-list-cell-navigate uni-navigate-bottom" hover-class="uni-list-cell-hover" :class="list.show ? 'uni-active' : ''"
                        @click="trigerCollapse(index)">
                        {{list.title}}
                    </view>
                    <view class="uni-list uni-collapse" :class="list.show ? 'uni-active' : ''">
                        <view class="uni-list-cell" hover-class="uni-list-cell-hover" v-for="(item,key) in list.item" :key="key" :class="key === list.item.length - 1 ? 'uni-list-cell-last' : ''">
                            <view class="uni-list-cell-navigate" @click="onSelect"> {{item}} </view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
	import service from '../../common/service.js'
	
    export default {
        data() {
            return {
                lists: [/* {
                        title: "A分区",
                        show: false,
                        item: ["土方开挖", "支撑1", "支撑2"]
                    },
                    {
                        title: "B分区",
                        show: false,
                        item: ["土方开挖1", "支撑1", "TV方案"]
                    },
                    {
                        title: "C分区",
                        show: false,
                        item: ["土方开挖"]
                    } */
                ]
            }
        },
        methods: {
			onSelect: function(){
				uni.navigateTo({
					url: './conditionCreate'
				})
			},
            trigerCollapse(e) {
                for (let i = 0, len = this.lists.length; i < len; ++i) {
                    if (e === i) {
                        this.lists[i].show = !this.lists[i].show;
                    } else {
                        this.lists[i].show = false;
                    }
                }

            }
        },
		onLoad() {
			this.lists = server.getPoints();
			console.log(JSON.stringify(this.lists));
		}
    }
</script>

<style>

</style>
