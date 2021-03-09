<template>
	<view class="QS">
		<view class="flex_column padding-rpx_25">
			<view 
			class="flex_row_between_c bgColor_ffffff padding-rpx_10_25 border-radius-rpx_10 margin-bottom-rpx_20 active_f8f8f8" 
			hover-class="bgColor_f8f8f8"
			v-for="(item, index) in JSRoutes" 
			:key="item.url" 
			@tap="QS_navigateTo(item.key)">
				<text class="QS-text">{{ $qst(`router.${item.key}`) }}</text>
				<QS-Icons type="arrow-right" size="30rpx"></QS-Icons>
			</view>
		</view>
		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				JSRoutes: Object.keys(uni.$qs.Pages.components).map(item=>({ ...uni.$qs.Pages.components[item] })).filter(item=>item.hide === undefined)
			}
		},
		onShow() {
			uni.$qs.changeTabbarItemLang();	//该方法在QS-UI-CONFIG/config/$qs.js 中拓展在$qs核心js中的
		},
	}
</script>
