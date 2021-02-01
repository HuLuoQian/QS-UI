import VALUES from '@/QS-UI-CONFIG/config/values.js';
module.exports = function() {	//获取系统信息，增加H5BrowserType字段
	const data = uni.getSystemInfoSync();
	// #ifdef H5
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
	// #endif
	return data;
}