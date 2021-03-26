<template>
	<view class="title-left-line" :style="{
        'border-bottom-color': gethasBorderBottom?borderBottomColor:'',
        backgroundColor: background,
        paddingLeft: paddingRow,
        paddingRight: paddingRow
    }">
		<view class="left-line" :style="{
            backgroundColor: leftLineColor,
            height: '50rpx'
        }"></view>
		<view class="title-left-line-title">
			<text :style="{
            fontSize: '30rpx'
        }">{{title}}</text>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'title-leftLine',
		props: {
			title: {
				type: String,
				default: ''
			},
			leftLineBackground: {
				type: String,
				default: '#EEEEEE'
			},
			hasBorderBottom: {
				type: [String, Boolean],
				default: true
			},
			borderBottomColor: {
				type: String,
				default: '#EEEEEE'
			},
			background: {
				type: String,
				default: ''
			},
			paddingRow: {
				type: [String, Number],
				default: '0px'
			}
		},
		computed: {
			gethasBorderBottom() {
				return String(this.hasBorderBottom) === 'true'
			},
			leftLineColor() {
				return uni.$qs.store.getters['theme/theme'].primary
			}
		}
	}
</script>

<style scoped>
	.title-left-line {
		/* width: 100%; */
		padding-top: 8px;
		padding-bottom: 8px;
		margin-bottom: 10px;
		display: flex;
		flex-direction: row;
		border-bottom-width: 1px;
		border-bottom-style: solid;
	}

	.left-line {
		width: 4px;
	}

	.title-left-line-title {
		margin-left: 12px;
		font-weight: bold;
		display: flex;
		flex-direction: row;
		align-items: center;
	}
</style>
