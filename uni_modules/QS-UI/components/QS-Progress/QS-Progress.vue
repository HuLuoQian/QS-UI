<template>
	<view :class="getClass" @touchstart="_touchstart" @touchmove="_touch" @tap="_click">
		<view class="QS-Progress" :style="{ width: componentWidth + 'px', height: componentHeight + 'px' }">
			<view ref="QS-Progress-unfill" class="QS-Progress-unfill">
				<block v-if="useSlot">
					<slot name="unfill"></slot>
				</block>
				<block v-else>
					<view class="flex_row">
						<block v-for="(item, index) in nStars" :key="item.id">
							<QSIcons :type="iconType" :size="iconSize" :color="defColor"></QSIcons>
						</block>
					</view>
				</block>
			</view>
				
				<view 
				ref="QS-Progress-fill"
				class="QS-Progress-fill" 
				:animation="Animation"
				:style="{ 
					width: getFillWidth + 'px',
					height: componentHeight + 'px' 
				}">
					<block v-if="useSlot">
						<slot name="fill"></slot>
					</block>
					<block v-else>
						<view class="flex_row">
							<block v-for="(item, index) in nStars" :key="item.id">
								<QSIcons :type="(iconType + '-fill')" :size="iconSize" :color="activeColor"></QSIcons>
							</block>
						</view>
					</block>
				</view>
			

		</view>
		<text v-if="showInfo" :style="{ 'font-size': iconSize, 'margin-left': '5px' }">{{getFormatPercent}}</text>
	</view>
</template>

<script>
	import QSIcons from '../QS-Icons/QS-Icons.vue';
	import props from '@/QS-UI-CONFIG/components/QS-Progress/js/props.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-Progress' });
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom');
	const animation = weex.requireModule('animation');
	// #endif
	function stars2Array(num) {
		return Array(num).fill('').map((item, index) => {
			return {
				id: 'id_' + index
			}
		});
	}
	var QSProgressCompoentsObjs = {};
	export default {
		mixins: [QSComponentMixinRes.mixin],
		components: {
			QSIcons
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			type: {
				type: String,
				default: 'def'
			},
			iconType: {
				type: String,
				default: 'star'
			},
			iconSize: {
				type: [String, Number],
				default: '16px'
			},
			defColor: {
				type: String,
				default: '#999999'
			},
			activeColor: {
				type: String,
				default: '#f1505c'
			},
			stars: {
				type: [String, Number],
				default: 5
			},
			percent: {
				type: [String, Number],
				default: 0
			},
			maxPercent: {
				type: [String, Number],
				default: 100
			},
			useAnimation: {
				type: [String, Boolean],
				default: true
			},
			useSlot: {
				type: [String, Boolean],
				default: false
			},
			showInfo: {
				type: [String, Boolean],
				default: false
			},
			format: {
				type: String,
				default: '{percent}'
			},
			...props
		},
		watch: {
			stars() {
				this.setnStars();
			},
			getPercent() {
				this.setWidth()
			},
			componentWidth() {
				this.setWidth()
			},
			maxPercent() {
				this.setWidth()
			}
		},
		computed: {
			QS_nCompClass() {
				return 'QS QS-Progress-container';
			},
			getFillWidth() {
				return (this.componentWidth*(this.getPercent/Number(this.maxPercent)));
			},
			getPercent() {
				let percent = Number(this.percent);
				if(percent < 0) return 0;
				if(percent > Number(this.maxPercent)) return Number(this.maxPercent);
				return percent;
			},
			getFormatPercent() {
				let r = new RegExp('{percent}', 'g');
				return this.format.replace(r, this.getPercent);
			}
		},
		data() {
			return {
				n: 1,
				nStars: [],
				hideNStars: [],
				componentWidth: 0,
				componentHeight: 0,
				componentLeft: 0,
				timeoutFn: null,
				mountedDate: new Date(),
				Animation: {},
				Ani: null
			}
		},
		created() {
			// #ifndef APP-NVUE
			this.Ani = uni.createAnimation({
				duration: 0
			});
			// #endif
			if (!QSProgressCompoentsObjs[this.type]) QSProgressCompoentsObjs[this.type] = {};
			if (!QSProgressCompoentsObjs[this.type].n) QSProgressCompoentsObjs[this.type].n = 1;
			this.n = QSProgressCompoentsObjs[this.type].n++;
		},
		mounted() {
			console.log(1)
			console.log(JSON.stringify(QSProgressCompoentsObjs[this.type]));
			this.mountedDate = new Date();
			this.setnStars();
			this.checkComponentInfo();
			this.$nextTick(()=>{
				setTimeout(()=>{
					this.setWidth();
				}, 1000)
			})
		},
		methods: {
			_click(){
				console.log(this.getFillWidth);
			},
			setWidth() {
				let width = (this.componentWidth*(this.getPercent/Number(this.maxPercent)));
				width = width < 0?0:width>this.componentWidth?this.componentWidth:width;
				// #ifndef APP-NVUE
				this.Ani.width(width + 'px').step();
				this.Animation = this.Ani.export();
				// #endif
				// #ifdef APP-NVUE
				animation.transition(this.$refs['QS-Progress-fill'], {
					styles: {
						width: width + 'px'
					},
					duration: 0, //ms
					needLayout: false,
					delay: 0 //ms
				})
				// #endif
			},
			_touchstart(e) {
				this.move(e.touches[0].pageX);
			},
			_touch(e) {
				this.move(e.touches[0].pageX);
			},
			move(x) {
				x = x - this.componentLeft;
				x = (x/this.componentWidth)*Number(this.maxPercent);
				x = x<0?0:x>Number(this.maxPercent)?Number(this.maxPercent):x;
				this.$emit('move', x)
			},
			checkComponentInfo() {
				console.log('checkComponentInfo :' + JSON.stringify(QSProgressCompoentsObjs[this.type].data))
				if (this.n < 4) return;
				if (QSProgressCompoentsObjs[this.type].data) {
					clearTimeout(this.timeoutFn);
					const obj = QSProgressCompoentsObjs[this.type].data;
					this.setInfo(obj);
					this.$nextTick(()=>{
						setTimeout(()=>{
							this.setWidth();
						}, 500)
					})
				} else {
					
					if ((new Date() - this.mountedDate) > 3000) {
						clearTimeout(this.timeoutFn);
						return;
					}
					this.timeoutFn = setTimeout(() => {
						this.checkComponentInfo();
					}, 500);
				}
			},
			setnStars() {
				this.$nextTick(() => {
					setTimeout(() => {
						this.nStars = stars2Array(this.stars);
						this.$nextTick(() => {
							setTimeout(() => {
								if (this.n < 4) {
									// this.hideNStars = stars2Array(this.stars);
									this.getComponentWidth();
								}
							}, 0)
						})
					}, 0)
				})
			},
			getComponentWidth() {
				this.getQuery(data => {
					// if (this.hideNStars.length > 0) this.hideNStars = [];
					this.setInfo(data);
				});
			},
			setInfo(data) {
				if(!QSProgressCompoentsObjs[this.type].data)QSProgressCompoentsObjs[this.type].data = data;
				// console.log('设置info:' + JSON.stringify(QSProgressCompoentsObjs[this.type].data))
				this.$nextTick(()=>{
					this.componentWidth = data.width;
					this.componentHeight = data.height;
					this.componentLeft = data.left;
				})
			},
			getQuery(cb) {
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['QS-Progress-unfill'], option => {
					if (cb && typeof cb === 'function') cb(option.size)
				})
				// #endif
				// #ifndef APP-NVUE
				let view;
				// #ifndef MP-BAIDU || MP-ALIPAY
				view = uni.createSelectorQuery().in(this);
				// #endif
				// #ifdef MP-BAIDU || MP-ALIPAY
				view = uni.createSelectorQuery();
				// #endif
				view.select('.QS-Progress-unfill').fields({
					size: true,
					rect: true
				})
				view.exec(res => {
					if (cb && typeof cb === 'function') cb(res[0])
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.QS-Progress-container {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		align-items: center;
	}

	.QS-Progress {
		/* #ifndef APP-NVUE */
		display: flex;
		white-space: nowrap;
		/* #endif */
		flex-direction: row;
		flex-wrap: nowrap;
		position: relative;
	}

	.QS-Progress-unfill {
		/* #ifndef APP-NVUE */
		display: flex;
		z-index: 1;
		/* #endif */
		position: absolute;
		top: 0;
		left: 0;
		flex-direction: row;
		justify-content: flex-start;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 0);
	}

	.QS-Progress-fill {
		/* #ifndef APP-NVUE */
		/* display: flex;
		z-index: 2; */
		/* #endif */
		/* position: absolute;
		top: 0;
		left: 0;
		width: 0;
		flex-direction: row;
		justify-content: flex-start;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 0); */
		/* #ifndef APP-NVUE */
		display: flex;
		z-index: 1;
		/* #endif */
		position: absolute;
		top: 0;
		left: 0;
		flex-direction: row;
		justify-content: flex-start;
		overflow: hidden;
		background-color: rgba(255, 255, 255, 0);
	}

	.QS-Progress-hide {
		/* #ifndef APP-NVUE */
		display: flex;
		pointer-events: none;
		white-space: nowrap;
		/* #endif */
		position: absolute;
		top: 0;
		left: 0;
		flex-direction: row;
		justify-content: flex-start;
		flex-wrap: nowrap;
		overflow: hidden;
		opacity: 0;
	}

	.flex_row {
		/* #ifndef APP-NVUE */
		display: flex;
		white-space: nowrap;
		/* #endif */
		flex-direction: row;
		flex-wrap: nowrap;
	}

	.active {
		transition-property: width, height, background-color;
		transition-duration: .3s;
	}
</style>
