<template>
	<view ref="QS-SwiperGrid" class="QS-SwiperGrid" :class="getClass">
		<block v-if="mode === 'swiper'">
			<swiper 
			:indicator-dots="indicatorDots"
			:indicator-color="indicatorColor"
			:indicator-active-color="indicatorActiveColor"
			:autoplay="autoplay"
			:interval="interval"
			
			:previous-margin="previousMargin"
			:next-margin="nextMargin"
			:circular="circular" 
			:current="swiperCurrent"
			:duration="Number(duration)"
			@animationfinish="swiperChange"
			
			:style="{ height: ((swiperHieght) + getIndicatorDotsHieght) + 'px' }">
				<swiper-item v-for="(item, index) in grids" :key="index">
						<QSGrid 
						ref="QS_Grid"
						:useQSAnimation="useQSAnimation"
						:animationType="animationType"
						:grids="item" 
						:hideText="hideText"
						:gridWidth="getWidth" 
						:padding="padding" 
						:paddingRow="paddingRow"
						:paddingCol="paddingCol"
						:iconSizeScale="iconSizeScale"
						:gridTextColor="gridTextColor"
						:gridTextSize="gridTextSize"
						:gridTextMarginTop="gridTextMarginTop" 
						:props="props"
						:gridOutline="gridOutline"
						:gridPadding="gridPadding"
						:iconBorderRadius="iconBorderRadius"
						:iconHeight="iconHeight"
						:iconWidth="iconWidth"
						:gridPaddingTop="gridPaddingTop"
						:gridPaddingBottom="gridPaddingBottom"
						:gridPaddingLeft="gridPaddingLeft"
						:gridPaddingRight="gridPaddingRight"
						:badgeRight="badgeRight"
						:badgeTop="badgeTop"
						:badgeLeft="badgeLeft"
						:badgeBottom="badgeBottom"
						:gridMinHeight="gridMinHeight"
						:ellipsis="ellipsis"
						@click="_click($event, index)"></QSGrid>
				</swiper-item>
			</swiper>
		</block>
		<block v-else>
			<QSGrid
			:useQSAnimation="useQSAnimation"
			:animationType="animationType"
			:grids="grids" 
			:hideText="hideText"
			:gridWidth="getWidth" 
			:paddingRow="paddingRow"
			:paddingCol="paddingCol"
			:iconSizeScale="iconSizeScale"
			:gridTextColor="gridTextColor"
			:gridTextSize="gridTextSize"
			:gridTextMarginTop="gridTextMarginTop" 
			:props="props"
			:gridOutline="gridOutline"
			:gridPadding="gridPadding"
			:iconBorderRadius="iconBorderRadius"
			:iconHeight="iconHeight"
			:iconWidth="iconWidth"
			:gridPaddingTop="gridPaddingTop"
			:gridPaddingBottom="gridPaddingBottom"
			:gridPaddingLeft="gridPaddingLeft"
			:gridPaddingRight="gridPaddingRight"
			:badgeRight="badgeRight"
			:badgeTop="badgeTop"
			:badgeLeft="badgeLeft"
			:badgeBottom="badgeBottom"
			:gridMinHeight="gridMinHeight"
			:ellipsis="ellipsis"
			@click="_click($event)"></QSGrid>
		</block>
	</view>
</template>

<script>
	import QSGrid from './QS-Grid.vue'
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Grids/js/props.js';
	import rpxUnit2px from '../../js/functions/rpxUnit2px.js';
	const QSComponentMixinRes = QSComponentMixin();
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom')
	// #endif
	export default {
		mixins: [QSComponentMixinRes.mixin],
		name: 'QS-SwiperGrid',
		components: {QSGrid},
		props:{
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			gridMinHeight: {
				type: [String, Number],
				default: 0
			},
			badgeRight: {
				type: [Number, String],
				default: ''
			},
			badgeTop: {
				type: [Number, String],
				default: ''
			},
			badgeLeft: {
				type: [Number, String],
				default: ''
			},
			badgeBottom: {
				type: [Number, String],
				default: ''
			},
			row: {
				type: [Number, String],
				default: 5
			},
			col: {
				type: [Number, String],
				default: 2
			},
			paddingRow: {
				type: [Number, String],
				default: 0
			},
			paddingCol: {
				type: [Number, String],
				default: 0
			},
			iconSizeScale: {
				type: [Number, String],
				default: .8
			},
			gridTextColor: {
				type: String,
				default: '#000'
			},
			gridTextSize: {
				type: String,
				default: '28rpx'
			},
			gridTextMarginTop: {
				type: [Number, String],
				default: '18rpx'
			},
			mode: {
				type: String,
				default: ''
			},
			props: {
				type: Object,
				default() { return {} }
			},
			gridOutline: {
				type: String,
				default: 'none'
			},
			gridPadding: {
				type: [Number, String],
				default: '15rpx'
			},
			iconBorderRadius: {
				type: [Number, String],
				default: '0'
			},
			
			
			indicatorDots: {
				type: [Boolean, String],
				default: false
			},
			indicatorDotsHieght: {
				type: [Number, String],
				default: 0
			},
			duration: {
				type: [Number, String],
				default: 500
			},
			circular: {
				type: [String, Boolean],
				default: false
			},
			defCurrent: {
				type: [String, Number],
				default: 0
			},
			previousMargin: {
				type: String,
				default: '0px'
			},
			nextMargin: {
				type: String,
				default: '0px'
			},
			indicatorColor: {
				type: String,
				default: 'rgba(0, 0, 0, .3)'
			},
			indicatorActiveColor: {
				type: String,
				default: '#000000'
			},
			autoplay: {
				type: [String, Boolean],
				default: false
			},
			interval: {
				type: [String, Number],
				default: 5000
			},
			gridsData: {
				type: Array,
				default: ()=>[]
			},
			hideText: {
				type: [String, Boolean],
				default: false
			},
			iconWidth: {
				type: [String, Number],
				default: 0
			},
			iconHeight: {
				type: [String, Number],
				default: 0
			},
			gridPaddingTop: {
				type: [Number, String],
				default: 0
			},
			gridPaddingBottom: {
				type: [Number, String],
				default: 0
			},
			gridPaddingLeft: {
				type: [Number, String],
				default: 0
			},
			gridPaddingRight: {
				type: [Number, String],
				default: 0
			},
			ellipsis: {
				type: [String, Boolean],
				default: false
			},
			useQSAnimation: {
				type: [String, Boolean],
				default: false
			},
			animationType: {
				type: String,
				default: 'jump'
			},
			...props
		},
		computed: {
			getWidth() {
				return (this.componentWidth - (rpxUnit2px(this.paddingRow)*2))/this.row;
			},
			getIndicatorDotsHieght() {
				return Number(this.indicatorDotsHieght);
			}
		},
		watch: {
			gridsData(n) {
				this.setData(n);
			}
		},
		data() {
			return {
				id_pre: 'QS-Grids_',
				grids: [],
				singleLenth: 0,
				componentWidth: 0,
				swiperHieght: 200,
				swiperCurrent: this.defCurrent
			}
		},
		mounted() {
			// #ifndef APP-NVUE
			this.countInfo()
			// #endif
			this.setData(this.gridsData);
		},
		methods: {
			swiperChange({detail: { current }}) {
				this.swiperCurrent = current;
			},
			countInfo() {
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['QS-SwiperGrid'], option => {
					// console.log('获取QS-SwiperGrid布局信息成功: ' + JSON.stringify(option))
					if(option.size) this.componentWidth = option.size.width;
					// this.$nextTick(()=>{
						this.countGridInfo();
					// })
				})
				// #endif
				// #ifndef APP-NVUE
				let view
				// #ifndef MP-BAIDU || MP-ALIPAY
				view = uni.createSelectorQuery().in(this)
				// #endif
				// #ifdef MP-BAIDU || MP-ALIPAY
				view = uni.createSelectorQuery()
				// #endif
				view.select('.QS-SwiperGrid').fields({
					size: true
				})
				view.exec(res=>{
					// console.log('获取节点信息成功:' + JSON.stringify(res))
					if(res[0] && res[0].width) {
						this.componentWidth = res[0].width
						// this.$nextTick(()=>{
							this.countGridInfo();
						// })
					}else{
						console.log('获取节点信息失败!!')
					}
				})
				// #endif
			},
			countGridInfo() {
				if(this.mode === 'swiper') {
					this.$nextTick(()=>{
						setTimeout(()=>{
							const refs = this.$refs.QS_Grid;
							if(!refs) return;
							const ref = refs[0];
							if(!ref) return;
							const fn = ref.countGridInfo;
							if(!fn || typeof fn !== 'function') return;
							fn(res=>{
								this.swiperHieght = res.height
							})
						}, 100)
					})
				}
			},
			setData(arr) {
				this.setGrids(arr);
			},
			setGrids(grids) {
				const arr = JSON.parse(JSON.stringify(grids))
				let newArr = [];
				
				if(this.mode === 'swiper') {
					const singleLenth = Number(this.row) * Number(this.col);
					if(singleLenth < 0) {
						console.log('行数与列数不正确');
						return;
					}
					this.singleLenth = singleLenth;
					
					const totalPage = Math.ceil(arr.length / singleLenth);
					
					for(let i = 0; i < totalPage; i++) {
						const page = [];
						
						for(let j = 0; j < singleLenth; j++) {
							const c = i * singleLenth + j;
							if(c > arr.length - 1) break;
							page.push(arr[c]);
						}
						newArr.push(page);
					}
				}else{
					newArr = arr
				}
				
				this.grids = newArr;
				this.$nextTick(()=>{
					this.countInfo()
					// this.countGridInfo();	
				})		
			},
			_click(index, pageNum) {
				console.log('宫格组件 grids接受点击事件')
				let count;
				if(pageNum !== undefined) {
					count = this.singleLenth * pageNum + index;
				}else{
					count = index;
				}
				this.$emit('gridClick', count)
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import "../../css/index.scss";
	.QS-SwiperGrid{
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		width: 100%;
		/* #endif */
		position: relative;
	}
</style>
