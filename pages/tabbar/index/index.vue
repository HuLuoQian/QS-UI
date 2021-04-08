<template>
	<view class="QS">
		<!-- #ifdef H5 -->
		<QS-P height="44px"></QS-P>
		<!-- #endif -->
		<logo></logo>
		<view class="flex_column padding-rpx_25">
			<block v-for="(item, index) in JSRoutes" :key="index">
				<block v-if="item.isTitle">
					<view class="padding-rpx_25">
						<text class="QS-text color_999999 large">{{item.isTitle}}</text>
					</view>
				</block>
				<block v-else>
					<view
						class="flex_row_between_c bgColor_ffffff padding-rpx_20_25 border-radius-rpx_10 margin-bottom-px_1"
						hover-class="bgColor_f8f8f8" @tap="navigateTo(item.key)">
						<text class="QS-text">{{ $qst(`router.${item.key}`) }}</text>
						<QS-Icons type="arrow-right" size="30rpx"></QS-Icons>
					</view>
				</block>
			</block>
		</view>
		<QS-P height="500px"></QS-P>

		<QS-BackTop tabbar></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				JSRoutes: Object.keys(uni.$qs.Pages.js).map(item => ({
					...uni.$qs.Pages.js[item]
				})).filter(item => item.hide === undefined).sort((ite) => ite.type).reduce((pre, cur) => {
					if (cur.type) {
						if (-1 == pre.findIndex(ite => ite.isTitle == cur.type))
							pre.push({
								isTitle: cur.type
							});
					} else {
						if (-1 == pre.findIndex(ite => ite.isTitle == ' '))
							pre.push({
								isTitle: ' '
							});
					}
					pre.push(cur);
					return pre;
				}, [])
			}
		},
		onShow() {
			uni.$qs.changeTabbarItemLang(); //该方法在QS-UI-CONFIG/config/$qs.js 中拓展在$qs核心js中的
		},
	}
</script>
