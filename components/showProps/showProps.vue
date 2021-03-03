<template>
	<view class="QS">
		<view class="flex_row">
			<QS-P width="25rpx"></QS-P>
			<view class="flex_column">
				{{wrap[0]}}
				<view class="flex_row">
					<QS-P width="25rpx"></QS-P>
					<view class="flex_column">
						<view class="flex_row" v-for="(item, index) in prop" :key="index">
							<text><text class="QS-text weight colon">{{item.name}}</text><text class="QS-text color_666666 margin-left-rpx_10 flex-wrap_wrap">{{item.value | filterValue}}</text></text></text>
						</view>
					</view>
				</view>
				{{wrap[1]}}
			</view>
			<!-- <text class="QS-text color_666666 flex-wrap_wrap" decode>
				{{getProps}}
			</text> -->
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
				<view class="flex_row" :class="index?'margin-top-rpx_15':''" v-for="(item, index) in prop" :key="index">
					<QS-P width="25rpx">·</QS-P>
					<text><text class="QS-text weight colon">{{item.name}}</text><text class="QS-text color_666666 flex-wrap_wrap margin-left-rpx_10">{{item.des}}</text></text>
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
					${this.type === 'component'?'props: ':''}{
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
