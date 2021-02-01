<template>
	<view class="QS">
		<view class="padding_25rpx">
			<view class="padding_25rpx bgColor_ffffff border-radius_10rpx">
				<QS-P height="100rpx"></QS-P>
				<view class="flex_row_c_c">
					<text>{{$qst('test.test')}}</text>
				</view>
				<QS-P height="300rpx"></QS-P>
				<view class="flex_row_c_c">
					<QS-Button @click="modify">{{$qst('test.modifyLang')}}</QS-Button>
				</view>
				<QS-P height="100rpx"></QS-P>
			</view>
		</view>
		<QS-BackTop ref="QSBackTop"></QS-BackTop>
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
