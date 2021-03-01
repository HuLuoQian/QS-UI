<template>
	<view ref="QS-SwiperGrid-items" class="QS-SwiperGrid-items" :style="{ padding: paddingCol + ' ' + paddingRow }">
		<block v-for="(item, index) in grids" :key="index">
			<block v-if="useQSAnimation">
			<QSAnimation :animationType="animationType" @click="_click(index)">
				<!-- #ifndef APP-NVUE -->
				<view class="QS-SwiperGrid-item" :style="{
			width: (getGridWidth-.1)  + 'px', 
			'min-height':  gridMinHeight ||  getHideText?(iconHeight || 0):(getGridWidth  + 'px'),
			outline: gridOutline,
			padding: gridPadding
		}">
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<view class="QS-SwiperGrid-item" :style="getItemStyleObj">
						<!-- #endif -->
						<image :src="item[getImageField]" mode="aspectFill" class="grid-img" :style="{ 
						'height': item[getImageHeightField] || iconHeight || getIconSize, 
						'width': item[getImageWidthField] || iconWidth || getIconSize,
						'border-radius': iconBorderRadius
					}"></image>
					<view class="QS-SwiperGrid-item-text">
						<text 
						v-if="!getHideText" 
						class="grid-text" 
						:class="[ { 'text-overflow_ellipsis': getEllipsis } ]"
						:style="{ color: gridTextColor, 'font-size': gridTextSize, 'margin-top': gridTextMarginTop }">{{item[getTextField] || item}}</text>
					</view>
						<QSBadge v-if="item[getBadgeValueField]" :text="item[getBadgeValueField]" position="absolute" :right="item[getBadgeRightField] || badgeRight"
						 :top="item[getBadgeTopField] || badgeTop" :left="item[getBadgeLeftField] || badgeLeft" :bottom="item[getBadgeBottomField] || badgeBottom"></QSBadge>
					</view>
			</QSAnimation>
			</block>
			<block v-else>
				<!-- #ifndef APP-NVUE -->
				<view class="QS-SwiperGrid-item" :style="{
			width: (getGridWidth-.1)  + 'px', 
			'min-height':  gridMinHeight ||  getHideText?(iconHeight || 0):(getGridWidth  + 'px'),
			outline: gridOutline,
			padding: gridPadding
		}"
				@tap="_click(index)" >
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<view class="QS-SwiperGrid-item" :style="getItemStyleObj" @tap="_click(index)">
						<!-- #endif -->
						<image :src="item[getImageField]" mode="aspectFill" class="grid-img" :style="{ 
						'height': item[getImageHeightField] || iconHeight || getIconSize, 
						'width': item[getImageWidthField] || iconWidth || getIconSize,
						'border-radius': iconBorderRadius
					}"></image>
					<view class="QS-SwiperGrid-item-text">
						<text 
						v-if="!getHideText" 
						class="grid-text" 
						:class="[ { 'text-overflow_ellipsis': getEllipsis } ]"
						:style="{ color: gridTextColor, 'font-size': gridTextSize, 'margin-top': gridTextMarginTop }">{{item[getTextField] || item}}</text>
					</view>
						<QSBadge v-if="item[getBadgeValueField]" :text="item[getBadgeValueField]" position="absolute" :right="item[getBadgeRightField] || badgeRight"
						 :top="item[getBadgeTopField] || badgeTop" :left="item[getBadgeLeftField] || badgeLeft" :bottom="item[getBadgeBottomField] || badgeBottom"></QSBadge>
					</view>
			</block>
		</block>
	</view>
</template>

<script>
	import QSAnimation from '../QS-Animation/QS-Animation.vue';
	import QSBadge from '../QS-Badge/QS-Badge.vue';
	// #ifdef APP-NVUE
	const dom = weex.requireModule('dom')
	// #endif
	export default {
		components: {
			QSBadge,
			QSAnimation
		},
		props: {
			useQSAnimation: {
				type: [String, Boolean],
				default: false
			},
			animationType: {
				type: String,
				default: 'jump'
			},
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
			grids: {
				type: Array,
				default () {
					return []
				}
			},
			gridWidth: {
				type: [Number, String],
				default: 0
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
			props: {
				type: Object,
				default () {
					return {}
				}
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
			}
		},
		computed: {
			getEllipsis() {
				return String(this.ellipsis) === 'true';
			},
			getBadgeRightField() {
				return this.props.badgeRightField || 'right'
			},
			getBadgeTopField() {
				return this.props.badgeTopField || 'top'
			},
			getBadgeLeftField() {
				return this.props.badgeLeftField || 'left'
			},
			getBadgeBottomField() {
				return this.props.badgeBottomField || 'bottom'
			},
			getGridWidth() {
				return Number(this.gridWidth);
			},
			getImageField() {
				return this.props.imageField || 'img'
			},
			getImageWidthField() {
				return this.props.widthField || 'width'
			},
			getImageHeightField() {
				return this.props.heightField || 'height'
			},
			getBadgeValueField() {
				return this.props.badgeValueField || 'badgeValue'
			},
			getTextField() {
				return this.props.textField || 'text'
			},
			getIconSize() {
				return Number(this.getGridWidth) * Number(this.iconSizeScale) + 'px'
			},
			getItemStyleObj() {
				let obj = {
					width: (this.getGridWidth - .1) + 'px',
					'min-height': String(this.hideText) === 'true' ? (this.iconHeight || 0) : (this.getGridWidth + 'px'),
					outline: this.gridOutline
				}
				if (this.gridPaddingTop || this.gridPaddingBottom || this.gridPaddingLeft || this.gridPaddingRight) {
					obj['padding-top'] = this.gridPaddingTop;
					obj['padding-bottom'] = this.gridPaddingBottom;
					obj['padding-left'] = this.gridPaddingLeft;
					obj['padding-right'] = this.gridPaddingRight;
				} else {
					obj.padding = this.gridPadding;
				}

				return obj;
			},
			getHideText() {
				return String(this.hideText) === 'true'
			}
		},
		methods: {
			_click(index) {
				console.log('宫格组件点击了 ')
				this.$emit('click', index)
			},
			countGridInfo(cb) {
				// #ifdef APP-NVUE
				dom.getComponentRect(this.$refs['QS-SwiperGrid-items'], option => {
					if (cb && typeof cb === 'function') cb(option.size)
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
				view.select('.QS-SwiperGrid-items').fields({
					size: true
				})
				view.exec(res => {
					// console.log('获取grid节点信息成功:' + JSON.stringify(res))
					if (res[0]) {
						if (cb && typeof cb === 'function') cb(res[0])
					}
				})
				// #endif
			}
		}
	}
</script>

<style lang="scss" scoped>
	.QS-SwiperGrid-items {
		/* #ifdef APP-NVUE */
		/* flex: 1; */
		/* #endif */
		/* #ifndef APP-NVUE */
		width: 100%;
		display: flex;
		/* #endif */
		flex-direction: row;
		flex-wrap: wrap;
	}

	.QS-SwiperGrid-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: relative;
	}
	.QS-SwiperGrid-item-text{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.grid-img {
		// background-color: #f8f8f8;
	}

	.grid-text {
		/* #ifdef APP-NVUE */
		flex: 1;
		/* #endif */
		/* #ifndef APP-NVUE */
		width: 100%;
		white-space: nowrap;
		/* #endif */
		text-align: center;
	}
	.text-overflow_ellipsis{
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
