<template>
    <view class="uni-swiper-page">
        <waterfall 
		ref="list" 
		:column-count="columnCount" 
		:column-width="columnWidth"
		:column-gap="columnGap"
		:left-gap="leftGap"
		:right-gap="rightGap"
		class="list" 
		:offset-accuracy="5" 
		fixFreezing="true">
            <cell v-for="(item, index) in dataList" :key="item.id" :ref="'item'+index">
				<def :itemObj="item" :customData="customData"></def>
            </cell>
            <cell class="loading"></cell>
        </waterfall>
    </view>
</template>

<script>
	import def from './template/waterfall/def.vue';
    export default {
		components: {def},
        props: {
            pid: {
                type: [Number, String],
                default: ''
            },
            parentId: {
                type: String,
                default: ''
            },
			columnCount: {
				type: [String, Number],
				default: 2
			},
			columnWidth: {
				type: [String, Number],
				default: 'auto'
			},
			columnGap: {
				type: [String, Number],
				default: 3
			},
			leftGap: {
				type: [String,Number],
				default: 3
			},
			rightGap: {
				type: [String,Number],
				default: 3
			},
			customData: {
				type: [Object,Array,String,Boolean,Number]
			}
        },
        data() {
            return {
                scrollable: true,
                dataList: [],
				setFreeze: false,
				headerHeight: 0
            }
        },
        methods: {
            setScrollRef(height) {
                if (this.$refs['list'].setSpecialEffects) {
					this.headerHeight = height;
                    this.$refs['list'].setSpecialEffects({
                        id: this.parentId,
                        headerHeight: height
                    });
                }else{
					console.log('没有setSpecialEffects方法');
				}
            },
            loadData() {
                // 首次激活时被调用
				for (var i = 0; i < 30; i++) {
				    this.dataList.push({
				        id: i,
				        name: i
				    });
				}
            },
            clear() {
                // 释放数据时被调用，参考 swiper-list 缓存配置
                this.dataList.length = 0;
            }
        }
    }
</script>

<style scoped>
    .uni-swiper-page {
        flex: 1;
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
    }

    .list {
        flex: 1;
    }

    .loading {
        height: 20px;
    }
</style>
