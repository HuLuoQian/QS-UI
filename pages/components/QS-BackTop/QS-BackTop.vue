<template>
	<view class="QS page">
		<view class="padding-rpx_25">
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<QS-P height="150rpx"></QS-P>
				<view class="flex_row_c_c">
					<text class="QS-text large weight color_333333">请上滑页面</text>
				</view>
				<QS-P height="150rpx"></QS-P>
				<showProps :prop="prop"></showProps>
				<QS-P :height="`${pageHeight}px`"></QS-P>
			</view>
		</view>
		
		<!-- 
		只要QS-UI-CONFIG/config/index.js-> mixins.usePageScroll为true， 
		并在页面上放置 QS-BackTop 组件 即可 
		-->
		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	/*
	offsetBottom: {
		type: [String, Number],
		default: 0
	},
	*/
	export default {
		data() {
			return {
				prop: [
					{ name: 'type', value: 'image', des: '展示类型, image为图片 slot为插槽' },
					{ name: 'image', value: '一张base64图片', des: 'mode为image时的图片地址' },
					{ name: 'text', value: '', des: 'mode为image时的图片下方的文字内容' },
					{ name: 'right', value: '30rpx', des: '悬浮定位距离页面右边界的距离' },
					{ name: 'bottom', value: '30rpx', des: '悬浮定位距离页面下边界的距离' },
					{ name: 'duration', value: '.3s', des: '动画过渡时长' },
					{ name: 'zIndex', value: '990', des: 'style的z-index值' },
					{ name: 'backTopType', value: 'page', des: '返回顶部的类型, 若为page, 则调用uni.pageScrollTo返回顶部, 否则emit事件"backTop"' },
					{ name: 'tabbar', value: false, des: 'H5端有效, 是否是tabbar页面, 若是自动加上tabbar高度' },
					{ name: 'offsetBottom', value: '990', des: '额外减去的bottom值' },
				],
				
				pageHeight: 0
			}
		},
		onReady() {
			this.setPageHeight();
		},
		methods: {
			setPageHeight() {
				this.QS_getQuery('.page')
					.then(res=>{
						const h = res[0].height;
						const minHeight = uni.$qs.getSys().windowHeight + uni.$qs.config.backTopShowScrollTop + 100;
						if(h < minHeight) {
							const diffH = minHeight - h;
							console.log('高度不足，补全高度' + diffH);
							this.pageHeight = diffH;
						}
					})
			}
		}
	}
</script>

<style>

</style>
