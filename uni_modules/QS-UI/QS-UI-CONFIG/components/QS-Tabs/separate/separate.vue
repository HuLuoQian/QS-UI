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
				type: [String, Number]
			},
			fontSize: {
				type: [String, Number]
			},
			fontWeight: {
				type: [String, Number]
			},
			color: {
				type: String
			},
			index: {
				type: [String, Number]
			},
			tabsLen: {
				type: [String, Number]
			},
			props: {
				type: Object,
				default: ()=>{ return { nameField: 'name' } }
			},
			type: {
				type: String
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
