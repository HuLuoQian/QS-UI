<template>
	<view class="QS">
		<view class="flex_column padding_25rpx">
			<view 
			class="flex_row_between_c bgColor_ffffff padding_10rpx_25rpx border-radius_10rpx margin-bottom_20rpx" 
			v-for="(item, index) in JSRoutes" 
			:key="item.url" 
			@tap="QS_navigateTo(item.key)">
				<text class="QS-text">{{ $qst(`router.${item.key}`) }}</text>
				<QS-Icons type="arrow-right" size="30rpx"></QS-Icons>
			</view>
		</view>
		<QS-BackTop ref="QSBackTop"></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				JSRoutes: Object.keys(uni.$qs.Pages.js).map(item=>({ ...uni.$qs.Pages.js[item] })).filter(item=>item.hide === undefined)
			}
		},
		onShow() {
			uni.$qs.changeTabbarItemLang();	//该方法在QS-UI-CONFIG/config/$qs.js 中拓展在$qs核心js中的
		}
	}
</script>
