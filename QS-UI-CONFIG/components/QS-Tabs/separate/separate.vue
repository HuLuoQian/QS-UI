<template>
	<view>
		<block v-if="type==='columnBetweenText'">
			<columnBetweenText 
			:isActive="isActive" 
			:tab="tab" 
			:height="height" 
			:fontSize="fontSize" 
			:fontWeight="fontWeight" 
			:props="props" 
			:type="type"
			:color="color"></columnBetweenText>
		</block>
		<block v-else>
			<def 
			:isActive="isActive" 
			:tab="tab" 
			:height="height" 
			:fontSize="fontSize" 
			:fontWeight="fontWeight" 
			:props="props" 
			:type="type"
			:color="color"></def>
		</block>
	</view>
</template>

<script>
	import def from './template/def.vue';
	import columnBetweenText from './template/columnBetweenText.vue';
	export default {
		components: {def, columnBetweenText},
		props: {
			tab: {
				type: [String, Number, Object, Array, Boolean],
				default: ()=>{ return {} }
			},
			height: {
				type: [String, Number],
				default: '84rpx'
			},
			fontSize: {
				type: [String, Number],
				default: '30rpx'
			},
			fontWeight: {
				type: [String, Number],
				default: ''
			},
			color: {
				type: String,
				default: ''
			},
			index: {
				type: [String, Number],
				default: null
			},
			tabsLen: {
				type: [String, Number],
				default: null
			},
			props: {
				type: Object,
				default: ()=>{ return { nameField: 'name' } }
			},
			type: {
				type: String,
				default: ''
			},
			isActive: {
				type: [String, Boolean],
				default: false
			}
		}
	}
</script>

<style>
</style>
