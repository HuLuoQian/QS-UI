<template>
	<view class="QS-Masonry" :class="getClass" :style="getStyle">
		<view class="QS-Masonry-container">
			<view class="col-container" v-for="(item, index) in getCol" :key="lists[index].id">
				<view class="col-container-item" :style="{ width: getColWidth }">
					<QSMasonryTemplate ref="QSMasonryTemplate" :type="type" :list="lists[index].list || []" :itemSpace="itemSpace"></QSMasonryTemplate>
				</view>
				<view class="colSpace" :style="{ width: colSpace }" v-if="index !== getCol.length"></view>
			</view>
			<view class="QS-hide-template" :style="{ width: getColWidth }">
				<QSMasonryTemplate ref="QSMasonryHideTemplate" hideTem :hasImage="hasImage" :type="type"></QSMasonryTemplate>
			</view>
		</view>
	</view>
</template>

<script>
	import QSMasonryTemplate from '@/QS-UI-CONFIG/components/QS-Masonry/separate/separate.vue';
	import {
		isArray
	} from '../../js/baseUtil.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Masonry/js/props.js';
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	const QSComponentMixinRes = QSComponentMixin();

	function getDefLists(col) {
		const arr = [];
		for (let i = 0; i < Number(col); i++) {
			arr.push({
				list: [],
				id: `QS_${String(i)}`,
				height: 0
			})
		}
		return arr
	}
	export default {
		mixins: [QSComponentMixinRes.mixin],
		components: {
			QSMasonryTemplate
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			type: { //列表type 用于模板分流组件区分不同的模板
				type: String,
				default: ''
			},
			list: { //list数组
				type: Array,
				default: () => []
			},
			col: { //列数
				type: [Number, String],
				default: 2
			},
			padding: { //最外部的间距
				type: String,
				default: '20rpx'
			},
			colSpace: { //列之间的间距
				type: [Number, String],
				default: '10rpx'
			},
			itemSpace: { //每项之间的上下间距
				type: [Number, String],
				default: '10rpx'
			},
			hasImage: {
				type: [Boolean, String],
				default: false
			},
			...props
		},
		data() {
			return {
				lists: getDefLists(Number(this.col)),
				data: [],
				nData: [],
				list_hide: [],
				maxWidth: 0,
				currentCount: 0,
				working: false,
				workQueue: []
			}
		},
		watch: {
			list(newValue) {
				console.log('执行setData 1')
				this.setData(newValue);
			},
			col(newValue) {
				console.log('col参数改变:' + newValue);
				console.log('data:' + JSON.stringify(this.data));
				// this.resetLists();
				this.lists = getDefLists(Number(newValue));
				this.$nextTick(() => {
					console.log('执行setData 2')
					this.setData(this.data)
				})
			}
		},
		computed: {
			QS_nCompStyle() {
				const style = { padding: this.padding };
				return style;
			},
			getCol() {
				const arr = [];
				for (let i = 0; i < Number(this.col); i++) {
					arr.push('')
				}
				return arr
			},
			getColWidth() {
				if (this.maxWidth) {
					const col = Number(this.col);
					const colWidth = (this.maxWidth - (rpxUnit2px(this.colSpace) * (col - 1))) / col;
					return `${colWidth}px`
				}
				return 0;
			}
		},
		mounted() {
			if(this.list.length > 0) {
				console.log('list 长度 大于零 执行setData')
				this.setData(this.list);
			}
		},
		methods: {
			getMaxWidth() {
				return new Promise((rs, rj) => {
					let view;
					// #ifdef MP-ALIPAY
					view = uni.createSelectorQuery();
					// #endif
					// #ifndef MP-ALIPAY
					view = uni.createSelectorQuery().in(this);
					// #endif
					view.select('.QS-Masonry-container').fields({
						size: true
					})
					view.exec(data => {
						this.maxWidth = data[0] ? data[0].width : 342;
						rs();
					})
				})
			},
			getListInfo(list, currentCount, type) {
				let _this = this;
				return new Promise((rs, rj) => {
					const ref = _this.$refs.QSMasonryHideTemplate;
					try {
						ref.setHideList([...list], () => {
							ref.getQuery().then(data => {
								ref.clearHideList();
								if((_this.currentCount - 1) === currentCount || type==='add') {
									rs(data);
								}else{
									rj();
								}
							})
						})
					} catch (e) {
						//TODO handle the exception
						rj(e)
					}
				})
			},
			add(newList) {
				if(this.working) {
					this.workQueue.push(newList);
				}else{
					this.addFn(newList);
				}
			},
			async addFn(newList) {
				if(!this.working) this.working = true;
				// console.log('增加列表数据:' + JSON.stringify(newList));
				if(this.currentCount > 999999) this.currentCount = 0;
				const currentCount = this.currentCount++;
				// console.log('当前次数:' + currentCount);
				try {
					if (!isArray(newList)) {
						console.log('QSMasonry异常: 不是数组')
						return;
					}
					const list = JSON.parse(JSON.stringify(newList))
					this.nData = this.nData.concat(list);
					// console.log(this.nData)
					if (!this.maxWidth) await this.getMaxWidth();
					await this.updateLists(list, currentCount, 'add');
				} catch (e) {
					//TODO handle the exception
				}
				if(this.working) this.working = false;
				if(this.workQueue.length > 0) {
					this.addFn(this.workQueue[0]);
					this.workQueue.splice(0, 1);
				}
			},
			async setData(newList) {	
				// console.log('设置列表数据:' + JSON.stringify(newList));
				if(this.currentCount > 999999) this.currentCount = 0;
				const currentCount = this.currentCount++;
				// console.log('当前次数:' + currentCount);
				try {
					if (!isArray(newList)) {
						console.log('QSMasonry异常: 不是数组')
						return;
					}
					const list = JSON.parse(JSON.stringify(newList))
					this.nData = list;
					if (!this.maxWidth) await this.getMaxWidth();
					if (list.length > 0) {
						// console.log('list length 大于 0')
						if (list.length > this.data.length) {
							// console.log('list length 大于 old list length， 执行 增加 列表操作')
							this.updateLists(list.slice(this.data.length, list.length), currentCount, 'setData');
						} else {
							console.log('list length 不大于 old list length， 先执行 清空列表操作再执行增加列表操作')
							this.resetLists();
							this.nData = list;
							this.updateLists(list, currentCount, 'setData');
						}
					} else {
						console.log('list length 等于 0， 执行清空列表操作')
						this.resetLists();
					}
					// console.log('nData 赋值:' + JSON.stringify(this.nData))
				} catch (e) {
					//TODO handle the exception
				}
			},
			updateListsHeight(currentCount, type) {
				return new Promise(async (rs, rj) => {
					const promises = [];
					const refs = this.$refs.QSMasonryTemplate;
					for (let i = 0; i < this.lists.length; i++) {
						promises.push(refs[i].getBoxQuery());
					}
					const infos = await Promise.all(promises);
					for (let i = 0; i < infos.length; i++) {
						const item = infos[i];
						if (item && item.height !== undefined)
							this.lists[i].height = item.height;
					}
					if((this.currentCount - 1) === currentCount || type==='add') {
						rs()
					}else{
						rj()
					}
				})
			},
			updateLists(list, currentCount, type) {
				return new Promise(async (rs, rj)=>{
					try{
						if((this.currentCount - 1) === currentCount)
						// console.log('等待更新列表布局信息')
						await this.updateListsHeight(currentCount, type);
						// console.log('等待获取列表布局信息')
						const listInfo = await this.getListInfo(list, currentCount, type);
						// console.log('获取列表布局信息: ' + JSON.stringify(listInfo))
						if((this.currentCount - 1) === currentCount || type==='add') {
							for (let i = 0; i < list.length; i++) {
								this.addListData(list[i], listInfo[i])
							}
							this.$nextTick(() => {
								this.data = [...this.nData];
								// console.log('nData：' + JSON.stringify(this.nData));
								// console.log('设置data：' + JSON.stringify(this.data));
								this.$emit('updated')
								rs();
							})
						}else{
							rs();
						}
					}catch(e){
						//TODO handle the exception
						rj()
					}
				})
			},
			addListData(data, info) {
				// console.log('info', info)
				const lists = this.lists;
				let obj = lists[0];
				for (let i = 1; i < lists.length; i++) {
					if (obj.height > lists[i].height) obj = lists[i];
				}
				obj.list.push(data);
				obj.height += info === null ? 10 : info.height;
			},
			resetLists() {
				// console.log('清空瀑布流列表')
				const lists = this.lists;
				for (let i = 0; i < lists.length; i++) {
					while (lists[i].list.length > 0) {
						lists[i].list.pop();
					}
					lists[i].height = 0
				}
				console.log('清空nData')
				this.nData = [];
				this.data = [];
			},
			reset() {
				console.log('外部调用 reset')
				this.resetLists();
			}
		}
	}
</script>

<style scoped lang="scss">
	@import "../../css/index.scss";

	.QS-Masonry {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.QS-Masonry-container {
		width: 100%;
		display: flex;
		flex-direction: row;
	}

	.QS-Masonry .col-container {
		display: flex;
		flex-direction: row;
	}

	.col-container-item {}

	.QS-hide-template {
		opacity: 0;
		pointer-events: none;
		position: absolute;
		top: -99999px;
		left: -99999px;
	}

	.colSpace {
		height: 100%;
	}
</style>
