<template>
	<view class="QS">
		<view class="flex_row">
			<QS-P width="25rpx"></QS-P>
			<text class="QS-text color_666666 flex-wrap_wrap" decode>
				{{getProps}}
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
						${prop.map(item=>`&nbsp;&nbsp;&nbsp;&nbsp;${item.name}: ${item.default},`).join('\n')}
					}
					`
			}
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
