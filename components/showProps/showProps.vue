<template>
	<!-- #ifndef APP-NVUE -->
	<view class="QS">
	<!-- #endif -->
	<!-- #ifdef APP-NVUE -->
	<view>
	<!-- #endif -->
		<view class="flex_column">
			<block v-if="showAttributesText">
				<text class="QS-text large-xx weight">Attributes</text>
				<QS-P height="25rpx"></QS-P>
			</block>
			<view class="flex_row">
				<QS-P width="25rpx"></QS-P>
				<view class="flex_column">
					<text>{{wrap[0]}}</text>
					<view class="flex_row">
						<QS-P width="25rpx"></QS-P>
						<view class="flex_column">
							<view class="flex_row" v-for="(item, index) in prop" :key="index">
								<!-- #ifndef APP-NVUE -->
								<text><text class="QS-text weight colon">{{item.name}}</text><text class="QS-text color_666666 margin-left-rpx_10 flex-wrap_wrap">{{item.value | filterValue}}</text></text></text>
								<!-- #endif -->
								<!-- #ifdef APP-NVUE -->
								
								<view class="flex_column">
									<text class="QS-text weight">{{item.name}}:</text>
									<view class="flex_row">
										<QS-P width="25rpx"></QS-P>
										<text class="QS-text color_666666 margin-left-rpx_10 flex-wrap_wrap" style="width: 500rpx;">{{item.value | filterValue}}</text>
									</view>
								</view>
								<!-- #endif -->
							</view>
						</view>
					</view>
					<text>{{wrap[1]}}</text>
				</view>
				<!-- <text class="QS-text color_666666 flex-wrap_wrap" decode>
					{{getProps}}
				</text> -->
			</view>
		</view>
		<view class="flex_row" v-if="merge">
			<QS-P width="25rpx"></QS-P>
			<view class="flex_column">
				<QS-P height="25rpx"></QS-P>
				<text class="QS-text weight color_FF6666">merge支持</text>
				<text class="QS-text color_666666">即传参可以是放在一个对象里面( fn({...args}) ), 也可以不放在对象里( fn(...args) ) 顺序就是上面对象属性从上到下的顺序</text>
				<QS-P height="25rpx"></QS-P>
			</view>
		</view>
		<view class="flex_row" v-if="showDes">
			<view class="flex_column">
				<QS-P height="25rpx"></QS-P>
				<view class="flex_row" :class="[index?'margin-top-rpx_15':'']" v-for="(item, index) in prop" :key="index">
					<QS-P width="25rpx">
						<text>·</text>
					</QS-P>
					<!-- #ifndef APP-NVUE -->
					<text><text class="QS-text weight colon">{{item.name}}</text><text class="QS-text color_666666 flex-wrap_wrap margin-left-rpx_10">{{item.des}}</text></text>
					<!-- #endif -->
					<!-- #ifdef APP-NVUE -->
					<view class="flex_column">
						<text class="QS-text weight">{{item.name}}:</text>
						<view class="flex_row">
							<QS-P width="25rpx"></QS-P>
							<text class="QS-text color_666666 flex-wrap_wrap margin-left-rpx_10" style="width: 500rpx;">{{item.des}}</text>
						</view>
					</view>
					<!-- #endif -->
				</view>
			</view>
			<text class="QS-text color_666666 flex-wrap_wrap" decode>
				{{getPropsDetail}}
			</text>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			prop: {
				type: Array,
				default: ()=>([])
			},
			type: {
				type: String,
				default: 'function'
			},
			merge: {
				type: Boolean,
				default: false
			},
			showDes: {
				type: Boolean,
				default: true
			},
			wrap: {
				type: Array,
				default: ()=>['{', '}']
			},
			showAttributesText: {
				type: Boolean,
				default: true
			}
		},
		filters: {
			filterValue(val) {
				switch(typeof val) {
					case 'string':
						if(val[0] === '{' && val[val.length-1] === '}') return val;
						if(val[0] === '[' && val[val.length-1] === ']') return val;
						return `"${val}"`;
						break;
					case 'object':
						return JSON.stringify(val);
						break;
					case 'undefined':
						return 'undefined';
						break;
					default:
						return val;
						break;
				}
			}
		},
		data() {
			return {
				
			}
		},
		computed: {
			getProps() {
				const prop = this.prop;
				return `
					{
						${prop.map(item=>`&nbsp;&nbsp;&nbsp;&nbsp;${item.name}: ${item.value},`).join('\n')}
					}
					`
			},
			getPropsDetail() {
				const prop = this.prop;
				return ``
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
