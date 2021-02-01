<template>
    <view class="uni-swiper-page">
        <list ref="list" class="list" :offset-accuracy="5" :bounce="false" fixFreezing="true">
            <cell v-for="(item, index) in dataList" :key="item.id" :ref="'item'+index">
				<def :itemObj="item" :customData="customData"></def>
            </cell>
            <cell class="loading"></cell>
        </list>
    </view>
</template>

<script>
	import def from './template/List/def.vue';
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
			customData: {
				type: [Object,Array,String,Boolean,Number]
			}
        },
        data() {
            return {
                scrollable: true,
                dataList: [],
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

    .list-item {
        margin-left: 12px;
        margin-right: 12px;
        margin-top: 12px;
        padding: 20px;
        background-color: #fff;
        border-radius: 5px;
    }

    .loading {
        height: 20px;
    }
</style>
