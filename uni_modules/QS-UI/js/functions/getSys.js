import VALUES from '@/QS-UI-CONFIG/config/values.js';
module.exports = function() {	//获取系统信息，增加H5BrowserType字段
	const data = uni.getSystemInfoSync();
	// #ifdef H5
	data.uniappPlatform = VALUES.uniappPlatform['H5'];
	if (/MicroMessenger/.test(window.navigator.userAgent)) { 
		data.H5BrowserType = VALUES.H5BrowserType.weixin;
	} else if (/AlipayClient/.test(window.navigator.userAgent)) { 
		data.H5BrowserType = VALUES.H5BrowserType.ali;
	} else {
		data.H5BrowserType = VALUES.H5BrowserType.other;
	}
	// #endif
	// #ifndef H5
	data.H5BrowserType = VALUES.H5BrowserType.notH5;
		// #ifdef APP-PLUS
		data.uniappPlatform = VALUES.uniappPlatform['APP-PLUS'];
		// #endif
		// #ifdef MP-WEIXIN
		data.uniappPlatform = VALUES.uniappPlatform['MP-WEIXIN'];
		// #endif
		// #ifdef MP-ALIPAY
		data.uniappPlatform = VALUES.uniappPlatform['MP-ALIPAY'];
		// #endif
		// #ifdef MP-BAIDU
		data.uniappPlatform = VALUES.uniappPlatform['MP-BAIDU'];
		// #endif
		// #ifdef MP-TOUTIAO
		data.uniappPlatform = VALUES.uniappPlatform['MP-TOUTIAO'];
		// #endif
		// #ifdef MP-QQ
		data.uniappPlatform = VALUES.uniappPlatform['MP-QQ'];
		// #endif
		// #ifdef MP-360
		data.uniappPlatform = VALUES.uniappPlatform['MP-360'];
		// #endif
	// #endif
	return data;
}