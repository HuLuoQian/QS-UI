<template>
	<view class="QS container">
		<template v-if="type === 'AD'">
			<AD :slotData="slotData"></AD>
		</template>
		<template v-else-if="type === 'def'">
			<def :slotData="slotData"></def>
		</template>
	</view>
</template>

<script>
	import AD from './template/AD.vue';
	import def from './template/def.vue';
	export default {
		components: {
			AD,
			def
		},
		props: {
			type: {
				type: String
			},
			slotData: {
				type: [String, Number, Boolean, Object, Array]
			}
		}
	}
</script>

<style scoped lang="scss">
	.container{
		// #ifndef APP-NVUE
		height: 100%;
		width: 100%;
		display: block;
		// #endif
		// #ifdef APP-NVUE
		flex: 1;
		// #endif
	}
</style>
