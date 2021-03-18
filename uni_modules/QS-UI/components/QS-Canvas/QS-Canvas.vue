<template>
	<view>
		<canvas  
		class="QS-Canvas"
		id="QS-canvas_0" 
		canvas-id="QS-canvas_0" 
		:style="{ 
			width: bgObj.width || 10 + 'px', 
			height: bgObj.height || 10 + 'px' 
		}"></canvas>
	</view>
</template>

<script>
	import {
		getSharePoster
	} from '../../js/QS-SharePoster/QS-SharePoster.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-Canvas' });

	var id = 0;
	var _this;
	var ctx;

	export default {
		mixins: [QSComponentMixinRes.mixin],
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			setContext: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				canvasId: `QS-canvas_0`,
				bgObj: {}
			}
		},
		created() {
			_this = this;
			ctx = uni.createCanvasContext(_this.canvasId, _this);
			ctx.toTempFilePath = uni.canvasToTempFilePath.bind()
			if (_this.setContext) {
				uni.$qs.pageRoots.setPageContext(_this, 'QS-Global-Canvas');
			}
		},
		methods: {
			draw({
				config = {},
				drawArray,
				cb
			} = {}) {
				return new Promise(async(rs, rj)=>{
					const d = await getSharePoster({
						delayTimeScale: 20, //元素延时系数
						drawDelayTime: 100, //额外延时时长, 生成白图时调大此参数
						...config,
						canvas2image: false, //是否使用uni.canvasToTempFilePath 生成图片
						_this: _this, //若在组件中使用 必传
						posterCanvasId: _this.canvasId, //canvasId
						Context: ctx, //强烈推荐传入自己创建的canvas实例, uni.createCanvasContext(canvasId, this), 以防出现卡在绘制中的问题
						setCanvasWH({ //一般必传， 动态设置canvas宽高
							bgObj
						}) {
							_this.bgObj = bgObj;
						},
						drawArray
					})
					console.log(d);
					uni.canvasToTempFilePath({
						canvasId: _this.canvasId,
						success:res=>{
							console.log('图片生成成功:', res)
							rs(res);
						},
						fail: err=>{
							console.log('图片生成失败:', err)
							rj(err);
						},
						complete: (c) => {
							console.log('图片生成完成:', c);
						}
					}, _this)
				})
				
			}
		}
	}
</script>

<style scoped lang="scss">
	.QS-Canvas {
		position: absolute;
		top: -99999px;
		right: 99999px;
		opacity: 0;
		pointer-events: none;
	}
</style>
