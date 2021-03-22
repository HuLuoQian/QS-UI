<script>
	export default {
		globalData: {
			isLogin: false 	,//演示跳转页面拦截登录
			requestLogin: false ,//演示访问接口拦截登录
		},
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style lang="scss">
	
	page{
		min-height: 100vh;
		background-color: #EEEEEE;
	}
	
	
	::-webkit-scrollbar {
		/* #ifndef APP-NVUE */
		display: none;
		/* #endif */
		width: 0 !important;
		height: 0 !important;
		-webkit-appearance: none;
		background: transparent;
	}
	
	
	view,
	scroll-view,
	swiper,
	swiper-item,
	cover-view,
	cover-image,
	icon,
	text,
	rich-text,
	progress,
	button,
	checkbox,
	form,
	input,
	label,
	radio,
	slider,
	switch,
	textarea,
	navigator,
	audio,
	camera,
	image,
	video,
	picker-view,
	picker-view-column {
		box-sizing: border-box;
	}
	
	.QS .fixed-bottom-center {
	  position: fixed;
	  bottom: 20rpx;
	  left: 50%;
	  transform: translateX(-50%);
	}
	.QS .text-overflow_ellipsis {
	  overflow: hidden;
	  white-space: nowrap;
	  text-overflow: ellipsis;
	}
	.QS .flex-wrap_wrap {
	  flex-wrap: wrap;
	  word-break: break-all;
	}
	.QS .white-space_nowrap {
	  white-space: nowrap;
	}
	.QS .statusText {
	  height: 50px;
	  /* #ifndef APP-NVUE */
	  width: 100%;
	  /* #endif */
	  display: flex;
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	  font-size: 30rpx;
	}
	.QS image {
	  will-change: transform;
	}
	.QS .width-rpx_750 {
	  width: 750rpx;
	}
	.QS .width_0 {
	  width: 0;
	}
	.QS .width_100 {
	  width: 100%;
	}
	.QS .colon::after {
	  content: ":";
	}
	.QS .width-full {
	  width: 100%;
	}
	.QS .height_auto {
	  height: auto;
	}
	.QS .height_full {
	  height: 100%;
	}
	.QS .text_overflow_ellipsis {
	  /* #ifndef APP-NVUE */
	  overflow: hidden;
	  text-overflow: ellipsis;
	  white-space: nowrap;
	  /* #endif */
	  /* #ifdef APP-NVUE */
	  /* #endif */
	}
	.QS .page-container {
	  /* #ifndef APP-NVUE */
	  width: 100%;
	  display: flex;
	  min-height: 100vh;
	  /* #endif */
	  /* #ifdef APP-NVUE */
	  flex: 1;
	  /* #endif */
	  flex-direction: column;
	}
	.QS .bgColor_f2f2f2 {
	  background-color: #F2F2F2;
	}
	.QS .bgColor_ffffff {
	  background-color: #FFFFFF;
	}
	.QS .flex_row {
	  display: flex;
	  flex-direction: row;
	}
	.QS .flex_column {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: column;
	}
	.QS .flex_row_c_c {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  justify-content: center;
	  align-items: center;
	}
	.QS .flex_column_c_c {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: column;
	  justify-content: center;
	  align-items: center;
	}
	.QS .flex_column_none_c {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: column;
	  align-items: center;
	}
	.QS .flex_column_e_c {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: column;
	  justify-content: flex-end;
	  align-items: center;
	}
	.QS .flex_row_none_c {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  align-items: center;
	}
	.QS .flex_row_none_e {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  align-items: flex-end;
	}
	.QS .flex_row_e_none {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  justify-content: flex-end;
	}
	.QS .flex_row_c_none {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  justify-content: center;
	}
	.QS .flex_row_between_c {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  justify-content: space-between;
	  align-items: center;
	}
	.QS .flex_row_around_c {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  justify-content: space-around;
	  align-items: center;
	}
	.QS .flex_column_between_c {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: column;
	  justify-content: space-between;
	  align-items: center;
	}
	.QS .flex_column_between_none {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: column;
	  justify-content: space-between;
	}
	.QS .flex_column_between_e {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: column;
	  justify-content: space-between;
	  align-items: flex-end;
	}
	.QS .flex_column_e_none {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: column;
	  justify-content: flex-end;
	}
	.QS .flex_column_c_none {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: column;
	  justify-content: center;
	}
	.QS .flex_column_none_e {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: column;
	  align-items: flex-end;
	}
	.QS .flex_row_e_c {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  justify-content: flex-end;
	  align-items: center;
	}
	.QS .flex_row_c_e {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  justify-content: center;
	  align-items: flex-end;
	}
	.QS .flex_row_between_e {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  justify-content: space-between;
	  align-items: flex-end;
	}
	.QS .flex_row_between_none {
	  /* #ifndef APP-NVUE */
	  display: flex;
	  /* #endif */
	  flex-direction: row;
	  justify-content: space-between;
	}
	.QS .flex_1 {
	  flex: 1;
	}
	.QS .flex_2 {
	  flex: 2;
	}
	.QS .flex_3 {
	  flex: 3;
	}
	.QS .flex_4 {
	  flex: 4;
	}
	.QS .flex_5 {
	  flex: 5;
	}
	.QS .flex_6 {
	  flex: 6;
	}
	.QS .flex_7 {
	  flex: 7;
	}
	.QS .flex_8 {
	  flex: 8;
	}
	.QS .flex_9 {
	  flex: 9;
	}
	.QS .QS-btn-fixed-bottom {
	  position: fixed;
	  bottom: 5vh;
	  left: 50%;
	  transform: translateX(-50%);
	}
	.QS .QS-img {
	  height: 120rpx;
	  width: 120rpx;
	}
	.QS .QS-img.circle {
	  border-radius: 50%;
	}
	.QS .QS-img.default {
	  height: 120rpx;
	  width: 120rpx;
	}
	.QS .QS-img.size_88rpx {
	  height: 88rpx;
	  width: 88rpx;
	}
	.QS .QS-img.size_80rpx {
	  height: 80rpx;
	  width: 80rpx;
	}
	.QS .QS-img.size_66rpx {
	  height: 66rpx;
	  width: 66rpx;
	}
	.QS .QS-text {
	  font-size: 30rpx;
	  color: #333333;
	}
	.QS .QS-text.weight {
	  font-weight: bold;
	}
	.QS .QS-text.weight_400 {
	  font-weight: 400;
	}
	.QS .QS-text.weight_500 {
	  font-weight: 500;
	}
	.QS .QS-text.weight_600 {
	  font-weight: 600;
	}
	.QS .QS-text.weight_700 {
	  font-weight: 700;
	}
	.QS .QS-text.weight_800 {
	  font-weight: 800;
	}
	.QS .QS-text.weight_900 {
	  font-weight: 900;
	}
	.QS .QS-text.mini {
	  font-size: 28rpx;
	}
	.QS .QS-text.mini-x {
	  font-size: 26rpx;
	}
	.QS .QS-text.mini-xx {
	  font-size: 24rpx;
	}
	.QS .QS-text.mini-xxx {
	  font-size: 22rpx;
	}
	.QS .QS-text.mini-xxxx {
	  font-size: 20rpx;
	}
	.QS .QS-text.default {
	  font-size: 30rpx;
	}
	.QS .QS-text.large {
	  font-size: 32rpx;
	}
	.QS .QS-text.large-x {
	  font-size: 34rpx;
	}
	.QS .QS-text.large-xx {
	  font-size: 36rpx;
	}
	.QS .QS-text.large-xxx {
	  font-size: 38rpx;
	}
	.QS .QS-text.large-36rpx {
	  font-size: 36rpx;
	}
	.QS .QS-text.large-42rpx {
	  font-size: 42rpx;
	}
	.QS .QS-text.large-48rpx {
	  font-size: 48rpx;
	}
	.QS .QS-text.text-decoration_line-through {
	  text-decoration: line-through;
	}
	.QS .margin-left-rpx_36 {
	  margin-left: 36rpx;
	}
	.QS .margin-left-rpx_30 {
	  margin-left: 30rpx;
	}
	.QS .margin-left-rpx_25 {
	  margin-left: 25rpx;
	}
	.QS .margin-left-rpx_20 {
	  margin-left: 20rpx;
	}
	.QS .margin-left-rpx_10 {
	  margin-left: 10rpx;
	}
	.QS .margin-left-rpx_15 {
	  margin-left: 15rpx;
	}
	.QS .margin-left_3px {
	  margin-left: 3px;
	}
	.QS .margin-top-rpx_10 {
	  margin-top: 10rpx;
	}
	.QS .margin-top-rpx_15 {
	  margin-top: 15rpx;
	}
	.QS .margin-top-rpx_18 {
	  margin-top: 18rpx;
	}
	.QS .margin-top-rpx_20 {
	  margin-top: 20rpx;
	}
	.QS .margin-top-rpx_25 {
	  margin-top: 25rpx;
	}
	.QS .margin-top-rpx_30 {
	  margin-top: 30rpx;
	}
	.QS .margin-bottom-px_1 {
	  margin-bottom: 1px;
	}
	.QS .margin-bottom-rpx_10 {
	  margin-bottom: 10rpx;
	}
	.QS .margin-bottom-rpx_20 {
	  margin-bottom: 20rpx;
	}
	.QS .padding-rpx_25 {
	  padding: 25rpx;
	}
	.QS .padding-rpx_20_25 {
	  padding: 20rpx 25rpx;
	}
	.QS .padding-rpx_22_25 {
	  padding: 22rpx 25rpx;
	}
	.QS .padding-rpx_8_25 {
	  padding: 8rpx 25rpx;
	}
	.QS .padding-rpx_10_25 {
	  padding: 10rpx 25rpx;
	}
	.QS .padding-rpx_15_25 {
	  padding: 15rpx 25rpx;
	}
	.QS .padding-rpx_20 {
	  padding: 20rpx;
	}
	.QS .padding-rpx_10_0 {
	  padding: 10rpx 0;
	}
	.QS .padding-rpx_5_0 {
	  padding: 5rpx 0;
	}
	.QS .padding-rpx_32_20 {
	  padding: 32rpx 20rpx;
	}
	.QS .padding-rpx_30_25 {
	  padding: 30rpx 25rpx;
	}
	.QS .padding-rpx_10_20 {
	  padding: 10rpx 20rpx;
	}
	.QS .padding-rpx_40_25 {
	  padding: 40rpx 25rpx;
	}
	.QS .bgColor_ffffff {
	  background-color: #FFFFFF;
	}
	.QS .bgColor_4E2B14 {
	  background-color: #4E2B14;
	}
	.QS .bgColor_f7f7f7 {
	  background-color: #f7f7f7;
	}
	.QS .bgColor_f8f8f8 {
	  background-color: #f8f8f8;
	}
	.QS .bgColor_eeeeee {
	  background-color: #EEEEEE;
	}
	.QS .bgColor_FFD313 {
	  background-color: #FFD313;
	}
	.QS .bgColor_FFF9DF {
	  background-color: #FFF9DF;
	}
	.QS .color_ffffff {
	  color: #FFFFFF;
	}
	.QS .color_808080 {
	  color: #808080;
	}
	.QS .color_B3B3B3 {
	  color: #B3B3B3;
	}
	.QS .color_7F7F7F {
	  color: #7F7F7F;
	}
	.QS .color_888888 {
	  color: #888888;
	}
	.QS .color_FFDEA0 {
	  color: #FFDEA0;
	}
	.QS .color_333333 {
	  color: #333333;
	}
	.QS .color_666666 {
	  color: #666666;
	}
	.QS .color_FCDEBA {
	  color: #FCDEBA;
	}
	.QS .color_4E2B14 {
	  color: #4E2B14;
	}
	.QS .color_F30000 {
	  color: #F30000;
	}
	.QS .color_FF6666 {
	  color: #FF6666;
	}
	.QS .color_999999 {
	  color: #999999;
	}
	.QS .color_F30000 {
	  color: #F30000;
	}
	.QS .color_CCCCCC {
	  color: #CCCCCC;
	}
	.QS .color_000000 {
	  color: #000000;
	}
	.QS .color_BBBBBB {
	  color: #BBBBBB;
	}
	.QS .color_D7230C {
	  color: #D7230C;
	}
	.QS .color_52BE00 {
	  color: #52BE00;
	}
	.QS .border-radius-rpx_10 {
	  border-radius: 10rpx;
	}
	.QS .border-radius-rpx_20 {
	  border-radius: 20rpx;
	}
	.QS .border-radius-px_60 {
	  border-radius: 60px;
	}
	.QS .border-bottom_1px_f2f2f2 {
	  border-bottom: 1px solid #F2F2F2;
	}
	.QS .hideCanvas {
	  position: absolute;
	  top: -99999px;
	  left: -99999px;
	  z-index: -99999;
	  opacity: 0;
	  pointer-events: none;
	}
	.QS .min-height_100vh {
	  min-height: 100vh;
	}
	
	
	
</style>

<!-- // .QS{
	// 	.fixed-bottom-center {
	// 		position: fixed;
	// 		bottom: 20rpx;
	// 		left: 50%;
	// 		transform: translateX(-50%);
	// 	}
	// 	.text-overflow_ellipsis{
	// 		overflow: hidden;
	// 		white-space: nowrap;
	// 		text-overflow: ellipsis;
	// 	}
	// 	.flex-wrap_wrap {
	// 		flex-wrap: wrap;
	// 		word-break: break-all;
	// 	}
	// 	.white-space_nowrap{
	// 		white-space: nowrap;
	// 	}
	// 	.statusText {
	// 		height: 50px;
	// 		/* #ifndef APP-NVUE */
	// 		width: 100%;
	// 		/* #endif */
	// 		display: flex;
	// 		flex-direction: row;
	// 		justify-content: center;
	// 		align-items: center;
	// 		font-size: 30rpx;
	// 	}
	// 	image{
	// 		will-change: transform;
	// 	}
	// 	.width-rpx_750{
	// 		width: 750rpx;
	// 	}
	// 	.width_0{
	// 		width: 0;
	// 	}
	// 	/* #ifndef APP-NVUE */
	// 	.width_100{
	// 		width: 100%;
	// 	}
	// 	.colon::after {
	// 		content: ':';
	// 	}
	// 	.width-full {
	// 		width: 100%;
	// 	}
	// 	/* #endif */
		
	// 	.height_auto{
	// 		height: auto;
	// 	}
	// 	.height_full{
	// 		height: 100%;
	// 	}
		
	// 	.text_overflow_ellipsis {
	// 		/* #ifndef APP-NVUE */
	// 		overflow: hidden;
	// 		text-overflow: ellipsis;
	// 		white-space: nowrap;
	// 		/* #endif */
	// 		/* #ifdef APP-NVUE */
	// 		/* #endif */
	// 	}
	
	// 	.page-container {
	// 		/* #ifndef APP-NVUE */
	// 		width: 100%;
	// 		display: flex;
	// 		min-height: 100vh;
	// 		/* #endif */
	// 		/* #ifdef APP-NVUE */
	// 		flex: 1;
	// 		/* #endif */
	// 		flex-direction: column;
	// 	}
	
	// 	.bgColor_f2f2f2 {
	// 		background-color: #F2F2F2;
	// 	}
	// 	.bgColor_ffffff {
	// 		background-color: #FFFFFF;
	// 	}
	
	// 	.flex_row {
	// 		display: flex;
	// 		flex-direction: row;
	// 	}
	
	// 	.flex_column {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 	}
	
	// 	.flex_row_c_c {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		justify-content: center;
	// 		align-items: center;
	// 	}
	
	// 	.flex_column_c_c {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 		justify-content: center;
	// 		align-items: center;
	// 	}
	
	// 	.flex_column_none_c {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 		align-items: center;
	// 	}
	
	// 	.flex_column_e_c {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 		justify-content: flex-end;
	// 		align-items: center;
	// 	}
	
	// 	.flex_row_none_c {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		align-items: center;
	// 	}
	
	// 	.flex_row_none_e {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		align-items: flex-end;
	// 	}
	
	// 	.flex_row_e_none {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		justify-content: flex-end;
	// 	}
	
	// 	.flex_row_c_none {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		justify-content: center;
	// 	}
	
	// 	.flex_row_between_c {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		justify-content: space-between;
	// 		align-items: center;
	// 	}
	
	// 	.flex_row_around_c {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		justify-content: space-around;
	// 		align-items: center;
	// 	}
	
	// 	.flex_column_between_c {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 		justify-content: space-between;
	// 		align-items: center;
	// 	}
	
	// 	.flex_column_between_none {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 		justify-content: space-between;
	// 	}
	
	// 	.flex_column_between_e {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 		justify-content: space-between;
	// 		align-items: flex-end;
	// 	}
	
	// 	.flex_column_e_none {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 		justify-content: flex-end;
	// 	}
	
	// 	.flex_column_c_none {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 		justify-content: center;
	// 	}
	
	// 	.flex_column_none_e {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: column;
	// 		align-items: flex-end;
	// 	}
	
	// 	.flex_row_e_c {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		justify-content: flex-end;
	// 		align-items: center;
	// 	}
	
	// 	.flex_row_c_e {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		justify-content: center;
	// 		align-items: flex-end;
	// 	}
	
	// 	.flex_row_between_e {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		justify-content: space-between;
	// 		align-items: flex-end;
	// 	}
	
	// 	.flex_row_between_none {
	// 		/* #ifndef APP-NVUE */
	// 		display: flex;
	// 		/* #endif */
	// 		flex-direction: row;
	// 		justify-content: space-between;
	// 	}
	
	// 	.flex_1 {
	// 		flex: 1;
	// 	}
	
	// 	.flex_2 {
	// 		flex: 2;
	// 	}
	
	// 	.flex_3 {
	// 		flex: 3;
	// 	}
	
	// 	.flex_4 {
	// 		flex: 4;
	// 	}
	
	// 	.flex_5 {
	// 		flex: 5;
	// 	}
	
	// 	.flex_6 {
	// 		flex: 6;
	// 	}
	
	// 	.flex_7 {
	// 		flex: 7;
	// 	}
	
	// 	.flex_8 {
	// 		flex: 8;
	// 	}
	
	// 	.flex_9 {
	// 		flex: 9;
	// 	}
	
	// 	.QS-btn-fixed-bottom {
	// 		position: fixed;
	// 		bottom: 5vh;
	// 		left: 50%;
	// 		transform: translateX(-50%);
	// 	}
	
	// 	.QS-img {
	// 		// background: #F8F8F8;
	// 		height: 120rpx;
	// 		width: 120rpx;
	// 		&.circle {
	// 			border-radius: 50%;
	// 		}
	// 		&.default {
	// 			height: 120rpx;
	// 			width: 120rpx;
	// 		}
	// 		&.size_88rpx {
	// 			height: 88rpx;
	// 			width: 88rpx
	// 		}
	// 		&.size_80rpx {
	// 			height: 80rpx;
	// 			width: 80rpx
	// 		}
	// 		&.size_66rpx{
	// 			height: 66rpx;
	// 			width: 66rpx;
	// 		}
	// 	}
	
	// 	.QS-text {
	// 		font-size: 30rpx;
	// 		color: #333333;
	// 		&.weight {
	// 			font-weight: bold;
	// 		}
	// 		&.weight_400{
	// 			font-weight: 400;
	// 		}
	// 		&.weight_500{
	// 			font-weight: 500;
	// 		}
	// 		&.weight_600{
	// 			font-weight: 600;
	// 		}
	// 		&.weight_700{
	// 			font-weight: 700;
	// 		}
	// 		&.weight_800{
	// 			font-weight: 800;
	// 		}
	// 		&.weight_900{
	// 			font-weight: 900;
	// 		}
	// 		&.mini {
	// 			font-size: 28rpx;
	// 		}
	// 		&.mini-x {
	// 			font-size: 26rpx;
	// 		}
	// 		&.mini-xx {
	// 			font-size: 24rpx;
	// 		}
	// 		&.mini-xxx {
	// 			font-size: 22rpx;
	// 		}
	// 		&.mini-xxxx {
	// 			font-size: 20rpx;
	// 		}
	// 		&.default {
	// 			font-size: 30rpx;
	// 		}
	// 		&.large {
	// 			font-size: 32rpx;
	// 		}
	// 		&.large-x {
	// 			font-size: 34rpx;
	// 		}
	// 		&.large-xx {
	// 			font-size: 36rpx;
	// 		}
	// 		&.large-xxx {
	// 			font-size: 38rpx;
	// 		}
	// 		&.large-36rpx{
	// 			font-size: 36rpx;
	// 		}
	// 		&.large-42rpx {
	// 			font-size: 42rpx;
	// 		}
	// 		&.large-48rpx {
	// 			font-size: 48rpx;
	// 		}
	// 		&.text-decoration_line-through {
	// 			text-decoration: line-through;
	// 		}
	// 	}
		
	// 	.margin-left-rpx_36{
	// 		margin-left: 36rpx;
	// 	}
	// 	.margin-left-rpx_30{
	// 		margin-left: 30rpx;
	// 	}
	// 	.margin-left-rpx_25{
	// 		margin-left: 25rpx;
	// 	}
	// 	.margin-left-rpx_20{
	// 		margin-left: 20rpx;
	// 	}
	// 	.margin-left-rpx_10{
	// 		margin-left: 10rpx;
	// 	}
	// 	.margin-left-rpx_15{
	// 		margin-left: 15rpx;
	// 	}
	// 	.margin-left_3px{
	// 		margin-left: 3px;
	// 	}
		
	// 	.margin-top-rpx_10{
	// 		margin-top: 10rpx;
	// 	}
	// 	.margin-top-rpx_15{
	// 		margin-top: 15rpx;
	// 	}
	// 	.margin-top-rpx_18{
	// 		margin-top: 18rpx;
	// 	}
	// 	.margin-top-rpx_20{
	// 		margin-top: 20rpx;
	// 	}
	// 	.margin-top-rpx_25{
	// 		margin-top: 25rpx;
	// 	}
	// 	.margin-top-rpx_30{
	// 		margin-top: 30rpx;
	// 	}
		
	// 	.margin-bottom-px_1 {
	// 		margin-bottom: 1px;
	// 	}
	// 	.margin-bottom-rpx_10 {
	// 		margin-bottom: 10rpx;
	// 	}
	// 	.margin-bottom-rpx_20{
	// 		margin-bottom: 20rpx;
	// 	}
		
	// 	.padding-rpx_25 {
	// 		padding: 25rpx;
	// 	}
	// 	.padding-rpx_20_25 {
	// 		padding: 20rpx 25rpx;
	// 	}
	// 	.padding-rpx_22_25{
	// 		padding: 22rpx 25rpx;
	// 	}
	// 	.padding-rpx_8_25{
	// 		padding: 8rpx 25rpx;
	// 	}
	// 	.padding-rpx_10_25{
	// 		padding: 10rpx 25rpx;
	// 	}
	// 	.padding-rpx_15_25{
	// 		padding: 15rpx 25rpx;
	// 	}
	// 	.padding-rpx_20 {
	// 		padding: 20rpx;
	// 	}
	// 	.padding-rpx_10_0 {
	// 		padding: 10rpx 0;
	// 	}
	// 	.padding-rpx_5_0{
	// 		padding: 5rpx 0;
	// 	}
	// 	.padding-rpx_32_20{
	// 		padding: 32rpx 20rpx;
	// 	}
	// 	.padding-rpx_30_25{
	// 		padding: 30rpx 25rpx;
	// 	}
	// 	.padding-rpx_10_20{
	// 		padding: 10rpx 20rpx;
	// 	}
	// 	.padding-rpx_40_25{
	// 		padding: 40rpx 25rpx;
	// 	}
		
	// 	.bgColor_ffffff {
	// 		background-color: #FFFFFF;
	// 	}
	// 	.bgColor_4E2B14 {
	// 		background-color: #4E2B14;
	// 	}
	// 	.bgColor_f7f7f7{
	// 		background-color: #f7f7f7;
	// 	}
	// 	.bgColor_f8f8f8{
	// 		background-color: #f8f8f8;
	// 	}
	// 	.bgColor_eeeeee{
	// 		background-color: #EEEEEE;
	// 	}
	// 	.bgColor_FFD313{
	// 		background-color: #FFD313;
	// 	}
	// 	.bgColor_FFF9DF{
	// 		background-color: #FFF9DF;
	// 	}
		
	// 	.color_ffffff {
	// 		color: #FFFFFF;
	// 	}
	// 	.color_808080{
	// 		color: #808080;
	// 	}
	// 	.color_B3B3B3{
	// 		color: #B3B3B3;
	// 	}
	// 	.color_7F7F7F{
	// 		color: #7F7F7F;
	// 	}
	// 	.color_888888{
	// 		color: #888888;
	// 	}
	// 	.color_FFDEA0 {
	// 		color: #FFDEA0;
	// 	}
	// 	.color_333333{
	// 		color: #333333;
	// 	}
	// 	.color_666666 {
	// 		color: #666666;
	// 	}
	// 	.color_FCDEBA {
	// 		color: #FCDEBA;
	// 	}
	// 	.color_4E2B14{
	// 		color: #4E2B14;
	// 	}
	// 	.color_F30000 {
	// 		color: #F30000;
	// 	}
	// 	.color_FF6666{
	// 		color: #FF6666
	// 	}
	// 	.color_999999{
	// 		color: #999999;
	// 	}
	// 	.color_F30000 {
	// 		color: #F30000;
	// 	}
	// 	.color_CCCCCC {
	// 		color: #CCCCCC;
	// 	}
	// 	.color_000000{
	// 		color: #000000;
	// 	}
	// 	.color_BBBBBB{
	// 		color: #BBBBBB;
	// 	}
	// 	.color_D7230C{
	// 		color: #D7230C;
	// 	}
	// 	.color_52BE00{
	// 		color: #52BE00;
	// 	}
		
		
	// 	.border-radius-rpx_10{
	// 		border-radius: 10rpx;
	// 	}
	// 	.border-radius-rpx_20 {
	// 		border-radius: 20rpx;
	// 	}
	// 	.border-radius-px_60{
	// 		border-radius: 60px;
	// 	}
		
	// 	.border-bottom_1px_f2f2f2{
	// 		border-bottom: 1px solid #F2F2F2;
	// 	}
		
		
	// 	.hideCanvas {
	// 		position: absolute;
	// 		top: -99999px;
	// 		left: -99999px;
	// 		z-index: -99999;
	// 		opacity: 0;
	// 		pointer-events: none;
	// 	}
		
	// 	.min-height_100vh{
	// 		min-height: 100vh;
	// 	}
	// } -->