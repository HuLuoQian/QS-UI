<template>
	<view 
	class="QS-Keyboard"
	:style="{
		backgroundColor: keyboardBgColor
	}">
		<slot name="top"></slot>
		<view class="" style="height: 1px;"></view>
		<block v-if="keyboardType == 'xxx'"></block>
		<block v-else-if="keyboardType == 'number'">
			<view class="number-container">
				<view v-for="(item, index) in number_config.items" :key="index" class="number-cols" :style="{ flex: item.flex }">
					<view 
					class="number-cols-item" 
					v-for="(ite, ind) in item.keys" 
					:key="ind" 
					:class="{ flex_1: ite === 'active' }" 
					:style="{ 
						backgroundColor: keyBgColor,
						height: keyHeight,
						'font-size': keyFontSize,
						'font-weight': keyFontWeight
					}"
					@tap.stop="input(ite)">
						<block v-if="ite === 'active'">
							<view class="active-btn" :style="{ backgroundColor: activeBgColor }">
								<text 
								:style="{ 
									'font-size': activeFontSize, 
									color: activeColor,
									'font-weight': activeFontWeight,
								}">
									{{activeName}}
								</text>
							</view>
						</block>
						<block v-else-if="ite === 'close' || ite === 'del'">
							<image 
							:src="images[ite]?(images[ite].src):''" 
							mode="aspectFill" 
							:style="{ 
								height: images[ite]?(images[ite].height):'', 
								width: images[ite]?(images[ite].width):'' }"></image>
						</block>
						<block v-else>
							{{number_config.keys[ite]}}
						</block>
					</view>
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	import QSP from '../QS-P/QS-P.vue';
	export default {
		components: { QSP },
		props: {
			keyboardBgColor: {
				type: String,
				default: '#EEEEEE'
			},
			activeName: {
				type: String,
				default: '确认\r\n支付'
			},
			activeColor: {
				type: String,
				default: '#ffffff'
			},
			activeFontSize: {
				type: String,
				default: '36rpx'
			},
			activeBgColor: {
				type: String,
				default: '#ffffff'
			},
			activeFontWeight: {
				type: [String, Number],
				default: ''
			},
			keyBgColor: {
				type: String,
				default: '#ffffff'
			},
			keyFontSize: {
				type: String,
				default: '42rpx'
			},
			keyFontWeight: {
				type: [String, Number],
				default: ''
			},
			images: {
				type: Object, 
				default: ()=>({
					close: {
						src: 'data:image/png;base64,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',
						height: '54rpx',
						width: '62rpx'
					},
					del: {
						src: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGwAAABICAYAAAATWxDtAAAESElEQVR4Xu3d7ZkNMRQH8LMVUAIVWBWgAlSAClABKkAFbAWoABWgAzrYrYDnv2Yes9ck5ySTk3My9+TrvNwkv7zNJLlzQj7CdSJ6QUTPfETHTSzOiegjEb0iop+I1YmDqN0gog9EdOogLl6jALjnRPTeGgxIn4kINSxCPgeAdtsSLLDKi+iZFdhjInodNatY7NwCDFjvMlH9RETfi5OyvwvQtz86TFZvMA4LHeub/eV9VYruTv37lYt7gnFYTzAKqkraPi8yBQus8kJlBhZY5Vi4wgQssOqwTMACqx6rO1hgbcPqCrba9i7iH6NBGWaXPox73RRYMqwuNSyw5BiSM1VrWGBJCMrOUQMLrDII6dkqYBwWZkpfSmMY513JgeZgHNYZEWF4H6EuB5qCYYb4GxFhCmAtWGChAD2dIvNWcYoGacfvIEPxshpp1QjNwBBhTOun1mBYYaEALYPGI8Ra2lE4NBYPNQHziAUkzKHNtUsLLZd2jWmqzWBesXJgONaipuXSfqG01GETmGcsoKAvxbKCa4nOZAsal3atkfAmMKwbfJDIjK9TB6zR8ZbcE33ql8ZoHJZmf10NhgUzqeH5jwkLa+Y8hJZolljIyyqwkbDmAtMCzRqrCmxErBZoHrCKwVLDZNzIWzOYaoprapoXrCKw3Gzxr+mB2UufxfWbJWiesMRgOSw8b6AjHG1VrgQNW3q8vb1hBx17xJL2adh75em9KFvD8IyFZ621MGrNOkwLV9PW0q75nMU158kalpsm2QuWtKYtM9ESK1vD0HZDcy1seaXDlSCr45KaZo2VBfudyDmMBO8NOMjgCgI3GsT1HgpqsknECOl+IpUYEQJtlGF8C6z5HtZoSTDuTfde0CQ16xDcEi07rOfa9dHRarCsaxr7HLZXNA4LAwy8ims9NcM1z9xxFgw34NDQ3z3kfsnRcQnWPHXEpb138ygCk6BhpRAi7z2UYEmf03qiicH2gFaD5Q2tCGxktC1YntCKwUZEa4HlBa0KDJHPvRjGca1VQ6V9ZEssD2jVYIj8CFtgsfJXYzUyN3rEqBmj59ZhE5h3tFwr0OJFbg4Nc2k3W2vVrpo6jIfXmoYtTfiDzMPQAkvSPLpcqj1H3CMaasDhZoiWWDk0rYW0m5vEZen1iIYdJPMuEjzca20kROHAq6w701Yj/KbGbEZTMO99mkKX0v2WzcECTddQBYxD2+ustS7V37urgQWaDp8qWKC1R1MHC7S2aF3AAq0dWjewQGuD1hUs0LajdQcLtG1oJmCBVo9mBiZBu/xyT33adnmlKRiHhuM9VySNIGwOFmhlxcQFmAQN0+2jbcsto5CdjT0P//0/isZMqSQ6iAjmlFJ/NSS5xzGec2EFhszmFrccIwiXZrMPvs0RCzSO6N9xbF8+taxhc1SwnhA7R27J4350ZwILSxHMP1q6zPnUyqej01kkGFAYhCFvLj8L/Af8oVt5TVmvggAAAABJRU5ErkJggg==',
						height: '36rpx',
						width: '54rpx'
					},
				})
			},
			keyboardType: {
				type: String,
				default: 'number'
			},
			keyHeight: {
				type: [String, Number],
				default: '100rpx'
			}
		},
		data() {
			return {
				nvalue: '',
				number_config: {
					keyBgColor: '#ffffff',
					items: [
						{
							flex: 1,
							keys: [ '1', '4', '7', '0' ],
						},
						{
							flex: 1,
							keys: [ '2', '5', '8', '.' ],
						},
						{
							flex: 1,
							keys: [ '3', '6', '9', 'close' ],
						},
						{
							flex: 1,
							keys: [ 'del', 'active' ],
						},
					],
					keys: {
						'1': '1',
						'2': '2',
						'3': '3',
						'4': '4',
						'5': '5',
						'6': '6',
						'7': '7',
						'8': '8',
						'9': '9',
						'0': '0',
						'.': '.',
						'close': 'close',
						'del': 'del',
						'active': {
							text: '确认支付',
							color: '#ffffff',
							bgColor: '#C8A776'
						}
					}
				}
			}
		},
		methods: {
			input(key) {
				uni.vibrateShort();
				const val = this.number_config.keys[key];
				if(key == 'active') {
					this.$emit('active', val);
					return;
				}
				if(key == 'close') {
					this.$emit('close', val);
					return;
				}
				if(key == 'del') {
					this.$emit('del', val);
					return;
				}
				this.$emit('input', val);
			}
		}
	}
</script>

<style lang="scss" scoped>
	.QS-Keyboard{
		display: flex;
		flex-direction: column;
		padding-bottom: 1px;
		width: 100%;
		.flex_1 {
			flex: 1;
		}
		.number-container{
			display: flex;
			flex-direction: row;
			flex: 1;
		}
		.number-cols{
			display: flex;
			flex-direction: column;
			&:not(:nth-child(1)) {
				margin-left: 1px;
			}
			.number-cols-item{
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				&:active{
					background-color: #f8f8f8 !important;
				}
				&:not(:nth-child(1)) {
					margin-top: 1px;
				}
			}
		}
	}
	.active-btn{
		height: 100%;
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}
</style>
