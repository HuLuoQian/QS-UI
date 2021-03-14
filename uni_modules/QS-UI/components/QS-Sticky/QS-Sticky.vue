<template>
	<view :id="componentId">
		
	</view>
</template>

<script>
	var id = 0;
	export default {
		data() {
			return {
				componentId: 'QS-Sticky-' + id++,
			}
		}
	}
</script>

<style scoped lang="scss">
</style>
