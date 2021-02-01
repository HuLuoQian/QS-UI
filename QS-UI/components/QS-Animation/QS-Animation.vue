<template>
	<view 
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
	const QSComponentMixinRes = QSComponentMixin();
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
		name: 'QSAnimation',
		props: {
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
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
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
			QS_nCompClass() {
				return 'QS-Animation';
			},
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
					await fn();
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
				// #ifdef APP-NVUE
				async function doPreAnimationFn () {
					for(let i = 0; i < preAnimationFn.length; i++) {
						await preAnimationFn[i];
					}
					this.preanimationing = false;
					if (this.touchended) {
						this.doR(this[this.animationType]());
					}
				}
				// #endif
				if (this.getSubsection) {
					if (type === 'start') {
						this.preanimationing = true;
						// #ifndef APP-NVUE
						preAnimationFn(AddDur);
						this.Animation = this.Ani.export();
						setTimeout(() => {
							this.preanimationing = false;
							if (this.touchended) {
								this.doR(this[this.animationType]());
							}
						}, AddDur.getDuration());
						// #endif
						// #ifdef APP-NVUE
						doPreAnimationFn();
						// #endif
						
						return false;
					}
				} else {
					// #ifndef APP-NVUE
					preAnimationFn(AddDur);
					// #endif
					// #ifdef APP-NVUE
					doPreAnimationFn();
					// #endif
				}
			},
			jump(type) {
				const AddDur = new addDuration();
				// #ifdef APP-NVUE
				const promiseArr = [];
				let s = this.iconTransition;
				promiseArr.push(s({ styles: { transform: 'scale(.5)' }, duration: AddDur.addDuration(50)} ));
				const bl = this.preAnimation(type, promiseArr, 'jump', AddDur);
				if (bl === false) return;
				promiseArr.push(s({ styles: { transform: 'scale(1.3)' }, duration: AddDur.addDuration(150)} ));
				promiseArr.push(s({ styles: { transform: 'scale(.75)' }, duration: AddDur.addDuration(100)} ));
				promiseArr.push(s({ styles: { transform: 'scale(1.15)' }, duration: AddDur.addDuration(100)} ));
				promiseArr.push(s({ styles: { transform: 'scale(.9)' }, duration: AddDur.addDuration(100)} ));
				promiseArr.push(s({ styles: { transform: 'scale(1)' }, duration: AddDur.addDuration(50)} ));
				// #endif
				// #ifndef APP-NVUE
				this.Animation = {};
				let preAnimationFn = () => {
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
						let s = this.iconTransition;
						await s({
							styles: {
								transform: 'scale(.5)'
							},
							duration: 100
						});
						await s({
							styles: {
								transform: 'scale(1.2)'
							},
							duration: 300
						});
						await s({
							styles: {
								transform: 'scale(.8)'
							},
							duration: 200
						});
						await s({
							styles: {
								transform: 'scale(1)'
							},
							duration: 100
						});
						rs();
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
				// #ifndef APP-NVUE
				const AddDur = new addDuration();
				this.Animation = {};
				const preAnimationFn = () => {
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
						let s = this.iconTransition;
						await s({
							styles: {
								transform: 'rotateZ(3deg)',
								transformOrigin: '-100% -100%'
							},
							duration: 100
						});
						await s({
							styles: {
								transform: 'rotateZ(-3deg)',
								transformOrigin: '-100% -100%'
							},
							duration: 100
						});
						await s({
							styles: {
								transform: 'rotateZ(0deg)',
								transformOrigin: '-100% -100%'
							},
							duration: 100
						});
						rs();
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
				// #ifndef APP-NVUE
				const AddDur = new addDuration();
				this.Animation = {};
				const preAnimationFn = () => {
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
				// this.Ani.rotateY(-7).translateX('-10%').scaleY(.95).step({
				// 	duration: AddDur.addDuration(25)
				// });
				// this.Ani.rotateY(7).translateX('10%').scaleY(.98).step({
				// 	duration: AddDur.addDuration(25)
				// });
				// this.Ani.rotateY(-3).translateX('-10%').scaleY(1).step({
				// 	duration: AddDur.addDuration(20)
				// });
				// this.Ani.rotateY(3).translateX('10%').scaleY(1).step({
				// 	duration: AddDur.addDuration(20)
				// });
				this.Ani.rotateY(0).translateX('0').scaleY(1).step({
					duration: AddDur.addDuration(10)
				});
				// #endif
				return {
					D: AddDur.getDuration(),
					P: new Promise(async (rs, rj) => {
						// #ifdef APP-NVUE
						let s = this.iconTransition;
						await s({
							styles: {
								transform: 'rotateY(-15deg) translateX(-10%) scaleY(.8)'
							},
							duration: 50
						});
						await s({
							styles: {
								transform: 'rotateY(15deg) translateX(10%) scaleY(.8)'
							},
							duration: 50
						});
						await s({
							styles: {
								transform: 'rotateY(-15deg) translateX(-10%) scaleY(.8)'
							},
							duration: 50
						});
						await s({
							styles: {
								transform: 'rotateY(15deg) translateX(10%) scaleY(.8)'
							},
							duration: 50
						});
						await s({
							styles: {
								transform: 'rotateY(0deg) translateX(0) scaleY(1)'
							},
							duration: 50
						});
						rs();
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
				// #ifndef APP-NVUE
				const AddDur = new addDuration();
				this.Animation = {};
				const preAnimationFn = () => {
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
						let s = this.iconTransition;
						await s({
							styles: {
								transform: 'scaleY(.5)',
								transformOrigin: '0 100%'
							},
							duration: 200
						});
						await s({
							styles: {
								transform: 'scaleY(1.3)',
								transformOrigin: '0 100%'
							},
							duration: 100
						});
						await s({
							styles: {
								transform: 'scaleY(.5)',
								transformOrigin: '0 100%'
							},
							duration: 100
						});
						await s({
							styles: {
								transform: 'scaleY(1)',
								transformOrigin: '0 100%'
							},
							duration: 100
						});
						rs();
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
		display: inherit;
	}
</style>
