<template>
	<view class="QS">
		<view class="padding-rpx_25">
			<view class="bgColor_ffffff border-radius-rpx_10 padding-rpx_25">
				<view class="flex_column_c_c">
					<text class="QS-text large weight">演示示例</text>
					<QS-P></QS-P>
					<text class="QS-text mini color_666666">请尝试点击按钮或点击图片</text>
				</view>
				<QS-P height="40rpx"></QS-P>
				<QS-Tabs 
				ref="tabs"
				mode="scroll" 
				hasLine
				:tabs="tabs" 
				width="650rpx" 
				activeColor="#ffffff"
				backgroundColor="#f7f7f7"
				:tabIndex="tabIndex"
				@click="tabIndexChange">
					<template v-slot:line="{ currentTabInfo }">
						<view 
						class="tab-line" 
						:style="{ 
							top: currentTabInfo.height * .1 + 'px',
							left: (currentTabInfo.left + (currentTabInfo.width * .1)) + 'px',
							height: currentTabInfo.height * .8 + 'px',
							width: currentTabInfo.width * .8 + 'px',
							backgroundColor: '#f1505c'
						}">
						</view>
					</template>
				</QS-Tabs>
				<QS-P height="40rpx"></QS-P>
				<button type="default" @tap="t(1)">1</button>
				<button type="default" @tap="t(2)">2</button>
				<button type="default" @tap="t(3)">3</button>
				<button type="default" @tap="t(4)">4</button>
			</view>
		</view>
		<QS-BackTop ref="QSBackTop"></QS-BackTop>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				tabIndex: 0,
				tabs: [
					{ name: 'Tab 1' },
					{ name: 'Tab 2' },
					{ name: 'Tab 3' },
					{ name: 'Tab 4' },
				]
			}
		},
		methods: {
			tabIndexChange(e) {
				this.tabIndex = e;
			},
			t(e) {
				this.$refs.tabs['test' + e]();
			}
		}
	}
</script>

<style scoped lang="scss">
.tab-line{
	position: absolute;
	border-radius: 10rpx;
	transition: left .3s;
}
</style>
