<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="padding-rpx_25 bgColor_ffffff border-radius-rpx_10">
				<QS-P height="100rpx"></QS-P>
				<view class="flex_row_c_c">
					<text>{{$qst('test.test')}}</text>
				</view>
				<QS-P height="300rpx"></QS-P>
				<view class="flex_row_c_c">
					<QS-Button @click="modify">{{$qst('test.modifyLang')}}</QS-Button>
				</view>
				<QS-P height="100rpx"></QS-P>
				<view class="flex_column_c_c">
					<text class="QS-text weight mini">可以返回页面查看</text>
					<QS-P></QS-P>
					<text class="QS-text weight mini">字节跳动小程序需重启后生效</text>
				</view>
				<QS-P height="50rpx"></QS-P>
			</view>
		</view>
		<QS-BackTop></QS-BackTop>
	</view>
</template>

<script>
	import langs from '@/QS-UI-CONFIG/config/lang/languages.js';
	export default {
		data() {
			return {
				languages: Object.keys(langs).map(item=>({...langs[item]}))
			}
		},
		methods: {
			modify() {
				uni.$qs.showActionSheet({
					itemList: this.languages.map(item=>item.name),
					success: (e)=>{
						uni.$qs.multiLang.setLang(this.languages[e.tapIndex].lang);
					}
				})
			}
		}
	}
</script>

<style>

</style>
