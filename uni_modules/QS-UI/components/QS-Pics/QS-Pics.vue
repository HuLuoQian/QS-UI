<template>
	<QStemplate :compClass="compClass" :compStyle="compStyle" :title="title" :titleHide="titleHide" :fontSize="fontSize" :width="width" :titleFlex="titleFlex"
	 :contentFlex="contentFlex" :titleStyle="titleStyle" :contentStyle="contentStyle" :required="required" :requiredSign="requiredSign"
	 :layout="layout" :titleLayout="titleLayout" :itemDisabled="itemDisabled" :titleColor="titleColor">
		<view class="width100 padding-rpx_10_15 wrap" :class="itemLayout_computed">
			
				<view 
				class="flex_column_c_c border_radius_4px transition_border_point6s padding_10rpx" 
				v-for="(picsItem, picsIndex) in itemArray"
				:key="picsIndex">
					<view 
					class="flex_row_c_c border1pxf2f2f2 position_relative border_radius_4px backgrounColor_f8f8f8 picsBox"
					@tap="chooseImg" 
					:data-picsindex="picsIndex"
					:data-customtapid="picsItem.customTapId">
						<image :src="itemArray[picsIndex].path"
						 class="border_radius_4px picsBox" mode="aspectFill" v-if="itemArray[picsIndex].path"
						 @tap.stop.prevent="showImg" :data-picsindex="picsIndex">
						</image>
						<view v-else>
							<QSIcons type="image" :size="45" color="#999999" />
						</view>
						<view class="picsClear" v-if="itemArray[picsIndex].path"
						 @tap.stop.prevent="clearPic" :data-picsindex="picsIndex">
							<QSIcons type="clear" :color="picsItem.clearColor||clearColor||'#f5105c'" :size="34" />
						</view>
					</view>
					<view class="flex_row_c_c fontColorADADAD picsItemTitle" v-if="picsItem.title">
						<view class="requiredSign" v-if="picsItem.required">{{requiredSign}}</view>{{picsItem.title}}
					</view>
				</view>
			
		</view>
	</QStemplate>
</template>

<script>
	import _app from '../../js/QS-inputs-split/app.js';
	import QSInputsMixin from '../../js/QS-inputs-split/QSInputsMixin.js';
	import QSIcons from '../QS-Icons/QS-Icons.vue';
	import QStemplate from '../QS-InputsSplitTemplate/QS-InputsSplitTemplate.vue';
	import QSComponentMixin from '../../mixins/QS-Components-Mixin.js';
	import props from '@/QS-UI-CONFIG/components/QS-Pics/js/props.js';
	const QSComponentMixinRes = QSComponentMixin({ componentType: 'QS-Pics' });

	export default {
		components: {
			QStemplate,
			QSIcons
		},
		props: {
			// #ifdef MP-ALIPAY
			...QSComponentMixinRes.props,
			// #endif
			clearColor: {
				type: String,
				default: '#f5105c'
			},
			...props
		},
		data() {
			let itemArray;
			if(this.value && Array.isArray(this.value) && this.value.length > 0) {
				itemArray = this.value;
			}else{
				itemArray = [];
			}
			return {
				itemArray,
				upLoadData: null
			}
		},
		methods: {
			chooseImg(
				{currentTarget: { dataset: { picsindex, infinite, customtapid } } } = {}
			) {
				if(this.itemArray[picsindex].path) return;
				if(customtapid) {
					this.$emit('picsTap', {
						title: this.title,
						variableName: this.variableName,
						picsIndex: picsindex,
						customTapId: customtapid
					});
				}else{
					uni.chooseImage({
						success: res => {
							this.$set(this.itemArray[picsindex], 'path', res.tempFilePaths[0]);
							this.setValue(this.itemArray);
						}
					})
				}
			},
			clearPic(
				{currentTarget: { dataset: { picsindex } } } = {}
			) {
				if(this.itemArray[picsindex].path) {
					this.itemArray[picsindex].path = '';
					this.setValue(this.itemArray);
				}
			},
			showImg(
				{currentTarget: { dataset: { picsindex } } } = {}
			) {
				_app.previewImage(this.itemArray.map(item=>item.path), picsindex);
			},
			setData(newArr) {
				this.itemArray = newArr;
				this.setValue(this.itemArray);
			},
			setUpLoadData(obj) {
				this.upLoadData = obj;
			},
			getUpLoadPromiseArray() {
				return _app.getUpLoadPromiseArray({
					itemArray: [...this.itemArray], 
					customId: this.customId, 
					upLoadData: this.upLoadData
				});
			}
		},
		mixins: [QSInputsMixin({
			QSInputsType: _app.typeObj.pics
		})]
	};
</script>

<style lang="scss" scoped>
	@import "../../css/QS-inputs-split/inputs.css";
	@import "@/QS-UI-CONFIG/components/QS-inputs-split/css/picsAndInfinitePics.css";
</style>
