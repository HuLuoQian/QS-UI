<template>
	<view 
	class="QS-Animation"
	:class="getClass"
	:style="getStyle"
	ref="icon"
	:animation="Animation"
	@touchstart="touchstart"
	@touchmove="touchmove"
	@touchend="touchend"
	@toucherror="touchend"
	@tap="_onClick">
		<slot></slot>
	</view>
</template>

<script>
	import props from '@/QS-UI-CONFIG/components/QS-Animation/js/props.js';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-Animation' });
	// #ifdef APP-NVUE
	const animationModule = weex.requireModule('animation');
	// #endif
	class addDuration {
		constructor() {
			this.duration = 0;
		}
		addDuration(dur) {
			this.duration += dur;
			return dur;
		}
		getDuration() {
			return this.duration;
		}
	}
	export default {
		mixins: [QSComponentMixinRes.mixin],
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			startAnimationType: {
				type: String,
				default: 'tap'
			},
			animationType: {
				type: String,
				default: 'jump'
			},
			animationFinishClick: {
				type: [Boolean, String],
				default: true
			},
			animationFinishClickDurationScale: {
				type: [String, Number],
				default: .75
			},
			animationFinishClickMoveThreshold: {
				type: [String, Number],
				default: 0
			},
			subsection: {
				type: [Boolean, String],
				default: true
			},
			disabled: {
				type: [Boolean, String],
				default: false
			},
			...props
		},
		data() {
			return {
				Animation: {},
				startAnimationTypes: []
			}
		},
		watch: {
			animationType(newValue) {
				this.setAnimationTypes();
			}
		},
		created() {
			this.setAnimationTypes();
			// #ifndef APP-NVUE
			this.Ani = uni.createAnimation({
				duration: 300
			});
			// #endif
		},
		mounted() {
			this.$nextTick(() => {
				if (this.startAnimationTypes.includes('create')) this.startAnimation();
			})
		},
		computed: {
			getAnimationFinishClickMoveThreshold() {
				return Number(this.animationFinishClickMoveThreshold);
			},
			getAnimationFinishClickDurationScale() {
				return Number(this.animationFinishClickDurationScale);
			},
			getSubsection() {
				return String(this.subsection) === 'true';
			}
		},
		methods: {
			touchstart(e) {
				if (!this.getSubsection) return;
				if (this.animationing) return;
				this.animationing = true;
				this.touchStart = e.touches[0];
				this.touchEnd = null;
				this.touchended = false;
				if (this.startAnimationTypes.includes('tap')) {
					this[this.animationType]('start');
				}
			},
			touchmove(e) {
				this.touchEnd = e.touches[0];
			},
			touchend(e) {
				if (!this.getSubsection) return;
				if (this.touchendanimationing) return;
				this.touchendanimationing = true;
				this.touchended = true;
				if (this.startAnimationTypes.includes('tap')) {
					if (!this.preanimationing) {
						this.doR(this[this.animationType]('end'));
					}
				}
			},
			setAnimationTypes() {
				this.startAnimationTypes = this.startAnimationType.split(',');
			},
			async _onClick() {
				if (this.getSubsection) return;
				if (this.startAnimationTypes.includes('tap')) {
					if (String(this.animationFinishClick) === 'true')
						await new Promise((rs) => {
							this.startAnimation(false, () => {
								rs()
							});
						})
					else
						this.startAnimation(false);
				}
				this._emit();
			},
			async startAnimation(animationType, cb) {
				if (this.animationing) return;
				this.animationing = true;
				const fn = this[animationType || this.animationType];
				if (fn && typeof fn === 'function') {
					await ((fn()).P);
					this.animationing = false;
					if (cb && typeof cb === 'function') cb();
				} else {
					console.log('动画函数不存在');
					this.animationing = false;
					if (cb && typeof cb === 'function') cb();
				}
			},
			_emit() {
				if(!this.disabled) this.$emit('click');
			},
			doR(R) {
				R.P.then(() => {
					this.animationing = false;
					this.touchendanimationing = false;
				});
				setTimeout(() => {
					if (!this.touchEnd) {
						this._emit();
					} else {
						if (Math.abs(this.touchStart.pageX - this.touchEnd.pageX) < this.getAnimationFinishClickMoveThreshold && Math.abs(
								this.touchStart.pageY - this.touchEnd.pageY) < this.getAnimationFinishClickMoveThreshold) {
							this._emit();
						}
					}
				}, R.D * this.getAnimationFinishClickDurationScale)
			},
			preAnimation(type, preAnimationFn, animationType, AddDur) {
				if (this.getSubsection) {
					if (type === 'start') {
						this.preanimationing = true;
						preAnimationFn(AddDur);
						// #ifndef APP-NVUE
						this.Animation = this.Ani.export();
						// #endif
						setTimeout(() => {
							this.preanimationing = false;
							if (this.touchended) {
								this.doR(this[this.animationType]());
							}
						}, AddDur.getDuration());
						
						return false;
					}
				} else {
					preAnimationFn(AddDur);
				}
			},
			jump(type) {
				const AddDur = new addDuration();
				let preAnimationFn;
				// #ifdef APP-NVUE
				let s = this.iconTransition;
				preAnimationFn = async ()=>{
					await s({ styles: { transform: 'scale(.5)', transformOrigin: '50% 50%' }, duration: AddDur.addDuration(50)} )
				}
				const bl = this.preAnimation(type, preAnimationFn, 'jump', AddDur);
				if (bl === false) return;
				const posAnimation = async (cb)=>{
					await s({ styles: { transform: 'scale(1)' }, duration: AddDur.addDuration(150)} );
					await s({ styles: { transform: 'scale(.75)' }, duration: AddDur.addDuration(100)} );
					await s({ styles: { transform: 'scale(1)' }, duration: AddDur.addDuration(100)} );
					await s({ styles: { transform: 'scale(.9)' }, duration: AddDur.addDuration(100)} );
					await s({ styles: { transform: 'scale(1)' }, duration: AddDur.addDuration(50)} );
					if(cb && typeof cb == 'function') cb();
				}
				// #endif
				// #ifndef APP-NVUE
				this.Animation = {};
				preAnimationFn = () => {
					this.Ani.scale(.5).step({
						duration: AddDur.addDuration(50)
					});
				}
				const bl = this.preAnimation(type, preAnimationFn, 'jump', AddDur);
				if (bl === false) return;
				this.Ani.scale(1.3).step({
					duration: AddDur.addDuration(150)
				});
				this.Ani.scale(.75).step({
					duration: AddDur.addDuration(100)
				});
				this.Ani.scale(1.15).step({
					duration: AddDur.addDuration(100)
				});
				this.Ani.scale(.9).step({
					duration: AddDur.addDuration(100)
				});
				this.Ani.scale(1).step({
					duration: AddDur.addDuration(50)
				});
				// #endif
				return {
					D: AddDur.getDuration(),
					P: new Promise(async (rs, rj) => {
						// #ifdef APP-NVUE
						posAnimation(()=>{
							rs();
						})
						// #endif
						// #ifndef APP-NVUE
						this.$nextTick(() => {
							this.Animation = this.Ani.export();
							setTimeout(() => {
								rs();
							}, AddDur.getDuration());
						})
						// #endif
					})
				}
			},
			pendant(type) {
				const AddDur = new addDuration();
				let preAnimationFn;
				// #ifdef APP-NVUE
				let s = this.iconTransition;
				preAnimationFn = async ()=>{
					await s({ styles: { transform: 'rotateZ(.3)', transformOrigin: '0 0' }, duration: AddDur.addDuration(100)} )
				}
				const bl = this.preAnimation(type, preAnimationFn, 'pendant', AddDur);
				if (bl === false) return;
				const posAnimation = async (cb)=>{
					await s({ styles: { transform: 'rotateZ(-0.3)' }, duration: AddDur.addDuration(90)} );
					await s({ styles: { transform: 'rotateZ(0.25)' }, duration: AddDur.addDuration(80)} );
					await s({ styles: { transform: 'rotateZ(-0.25)' }, duration: AddDur.addDuration(70)} );
					await s({ styles: { transform: 'rotateZ(0.08)' }, duration: AddDur.addDuration(60)} );
					await s({ styles: { transform: 'rotateZ(-0.08)' }, duration: AddDur.addDuration(50)} );
					await s({ styles: { transform: 'rotateZ(0)' }, duration: AddDur.addDuration(40)} );
					if(cb && typeof cb == 'function') cb();
				}
				// #endif
				// #ifndef APP-NVUE
				this.Animation = {};
				preAnimationFn = () => {
					this.Ani.rotateZ(3).step({
						duration: AddDur.addDuration(100),
						transformOrigin: '-100% -100%'
					});
				}
				const bl = this.preAnimation(type, preAnimationFn, 'pendant', AddDur);
				if (bl === false) return;
				this.Ani.rotateZ(-3).step({
					duration: AddDur.addDuration(90),
					transformOrigin: '-100% -100%'
				});
				this.Ani.rotateZ(2.5).step({
					duration: AddDur.addDuration(80),
					transformOrigin: '-100% -100%'
				});
				this.Ani.rotateZ(-2.5).step({
					duration: AddDur.addDuration(70),
					transformOrigin: '-100% -100%'
				});
				this.Ani.rotateZ(.8).step({
					duration: AddDur.addDuration(60),
					transformOrigin: '-100% -100%'
				});
				this.Ani.rotateZ(-.8).step({
					duration: AddDur.addDuration(50),
					transformOrigin: '-100% -100%'
				});
				this.Ani.rotateZ(0).step({
					duration: AddDur.addDuration(40),
					transformOrigin: '-100% -100%'
				});
				// #endif
				return {
					D: AddDur.getDuration(),
					P: new Promise(async (rs, rj) => {
						// #ifdef APP-NVUE
						posAnimation(()=>{
							rs();
						})
						// #endif
						// #ifndef APP-NVUE
						this.$nextTick(() => {
							this.Animation = this.Ani.export();
							setTimeout(() => {
								rs();
							}, AddDur.getDuration());
						})
						// #endif
					})
				}
			},
			shook(type) {
				const AddDur = new addDuration();
				let preAnimationFn;
				// #ifdef APP-NVUE
				let s = this.iconTransition;
				preAnimationFn = async ()=>{
					await s({ styles: { transform: 'rotateY(-15deg) translateX(-10%) scaleY(.7)', transformOrigin: '50% 50%' }, duration: AddDur.addDuration(50)} )
				}
				const bl = this.preAnimation(type, preAnimationFn, 'shook', AddDur);
				if (bl === false) return;
				const posAnimation = async (cb)=>{
					await s({ styles: { transform: 'rotateY(15deg) translateX(10%) scaleY(.73)' }, duration: AddDur.addDuration(50)} );
					// await s({ styles: { transform: 'rotateY(-12deg) translateX(-10%) scaleY(.75)' }, duration: AddDur.addDuration(45)} );
					// await s({ styles: { transform: 'rotateY(12deg) translateX(10%) scaleY(.78)' }, duration: AddDur.addDuration(45)} );
					await s({ styles: { transform: 'rotateY(-7deg) translateX(-10%) scaleY(.81)' }, duration: AddDur.addDuration(35)} );
					await s({ styles: { transform: 'rotateY(7deg) translateX(10%) scaleY(.85)' }, duration: AddDur.addDuration(35)} );
					// await s({ styles: { transform: 'rotateY(4deg) translateX(-10%) scaleY(.88)' }, duration: AddDur.addDuration(35)} );
					// await s({ styles: { transform: 'rotateY(-4deg) translateX(10%) scaleY(.93)' }, duration: AddDur.addDuration(30)} );
					await s({ styles: { transform: 'rotateY(0) translateX(0) scaleY(1)' }, duration: AddDur.addDuration(10)} );
					if(cb && typeof cb == 'function') cb();
				}
				// #endif
				// #ifndef APP-NVUE
				this.Animation = {};
				preAnimationFn = () => {
					this.Ani.rotateY(-15).translateX('-10%').scaleY(.7).step({
						duration: AddDur.addDuration(50)
					});
				}
				const bl = this.preAnimation(type, preAnimationFn, 'shook', AddDur);
				if (bl === false) return;
				this.Ani.rotateY(15).translateX('10%').scaleY(.73).step({
					duration: AddDur.addDuration(50)
				});
				this.Ani.rotateY(-12).translateX('-10%').scaleY(.75).step({
					duration: AddDur.addDuration(45)
				});
				this.Ani.rotateY(12).translateX('10%').scaleY(.78).step({
					duration: AddDur.addDuration(45)
				});
				this.Ani.rotateY(-7).translateX('-10%').scaleY(.81).step({
					duration: AddDur.addDuration(35)
				});
				this.Ani.rotateY(7).translateX('10%').scaleY(.85).step({
					duration: AddDur.addDuration(35)
				});
				this.Ani.rotateY(-4).translateX('-10%').scaleY(.88).step({
					duration: AddDur.addDuration(30)
				});
				this.Ani.rotateY(4).translateX('10%').scaleY(.93).step({
					duration: AddDur.addDuration(30)
				});
				this.Ani.rotateY(0).translateX('0').scaleY(1).step({
					duration: AddDur.addDuration(10)
				});
				// #endif
				return {
					D: AddDur.getDuration(),
					P: new Promise(async (rs, rj) => {
						// #ifdef APP-NVUE
						posAnimation(()=>{
							rs();
						})
						// #endif
						// #ifndef APP-NVUE
						this.$nextTick(() => {
							this.Animation = this.Ani.export();
							setTimeout(() => {
								rs();
							}, AddDur.getDuration());
						})
						// #endif
					})
				}
			},
			elasticity_Y(type) {
				const AddDur = new addDuration();
				let preAnimationFn;
				// #ifdef APP-NVUE
				let s = this.iconTransition;
				preAnimationFn = async ()=>{
					await s({ styles: { transform: 'scaleY(.5)', transformOrigin: '0 100%' }, duration: AddDur.addDuration(100)} )
				}
				const bl = this.preAnimation(type, preAnimationFn, 'elasticity_Y', AddDur);
				if (bl === false) return;
				const posAnimation = async (cb)=>{
					await s({ styles: { transform: 'scaleY(1)', transformOrigin: '0 100%' }, duration: AddDur.addDuration(90)} );
					await s({ styles: { transform: 'scaleY(.7)', transformOrigin: '0 100%' }, duration: AddDur.addDuration(80)} );
					await s({ styles: { transform: 'scaleY(1)', transformOrigin: '0 100%' }, duration: AddDur.addDuration(70)} );
					await s({ styles: { transform: 'scaleY(.9)', transformOrigin: '0 100%' }, duration: AddDur.addDuration(60)} );
					await s({ styles: { transform: 'scaleY(1)', transformOrigin: '0 100%' }, duration: AddDur.addDuration(50)} );
					await s({ styles: { transform: 'scaleY(.95)', transformOrigin: '0 100%' }, duration: AddDur.addDuration(40)} );
					await s({ styles: { transform: 'scaleY(1)', transformOrigin: '0 100%' }, duration: AddDur.addDuration(30)} );
					if(cb && typeof cb == 'function') cb();
				}
				// #endif
				// #ifndef APP-NVUE
				this.Animation = {};
				preAnimationFn = () => {
					this.Ani.scaleY(.5).step({
						duration: AddDur.addDuration(100),
						transformOrigin: '0 100%'
					});
				}
				const bl = this.preAnimation(type, preAnimationFn, 'elasticity_Y', AddDur);
				if (bl === false) return;
				this.Ani.scaleY(1.15).step({
					duration: AddDur.addDuration(90),
					transformOrigin: '0 100%'
				});
				this.Ani.scaleY(.7).step({
					duration: AddDur.addDuration(80),
					transformOrigin: '0 100%'
				});
				this.Ani.scaleY(1.1).step({
					duration: AddDur.addDuration(70),
					transformOrigin: '0 100%'
				});
				this.Ani.scaleY(.9).step({
					duration: AddDur.addDuration(60),
					transformOrigin: '0 100%'
				});
				this.Ani.scaleY(1.05).step({
					duration: AddDur.addDuration(50),
					transformOrigin: '0 100%'
				});
				this.Ani.scaleY(.95).step({
					duration: AddDur.addDuration(40),
					transformOrigin: '0 100%'
				});
				this.Ani.scaleY(1).step({
					duration: AddDur.addDuration(30),
					transformOrigin: '0 100%'
				});
				// #endif
				return {
					D: AddDur.getDuration(),
					P: new Promise(async (rs, rj) => {
						// #ifdef APP-NVUE
						posAnimation(()=>{
							rs();
						})
						// #endif
						// #ifndef APP-NVUE
						this.$nextTick(() => {
							this.Animation = this.Ani.export();
							setTimeout(() => {
								rs();
							}, AddDur.getDuration());
						})
						// #endif
					})
				}
			},
			iconTransition({
				styles = {},
				duration = 0,
				delay = 0
			} = {}) {
				return new Promise((rs, rj) => {
					// #ifdef APP-NVUE
					animationModule.transition(this.$refs.icon, {
						styles: styles,
						duration: duration, //ms
						needLayout: false,
						delay: delay //ms
					}, () => {
						rs();
					});
					// #endif
					// #ifndef APP-NVUE
					rs();
					// #endif
				})
			}
		}
	}
</script>

<style scoped>
	.QS-Animation {
		/* #ifndef APP-NVUE */
		display: inline-block;
		/* #endif */
	}
</style>
