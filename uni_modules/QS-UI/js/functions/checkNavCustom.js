
let nav_custom;
module.exports = function() {	//判断微信小程序当前版本是否支持页面隐藏原生导航栏， 摘自网上
	// #ifdef MP-WEIXIN
	if (nav_custom !== undefined) return nav_custom;
	const Sys = uni.getSystemInfoSync();
	const version = parseInt(Sys.version.split('.').join('')); //微信版本
	const SDKVersion = parseInt(Sys.SDKVersion.split('.').join('')); //基础库版本
	const bl = (version > 700 && SDKVersion > 243);
	nav_custom = bl;
	return bl;
	// #endif
	// #ifndef MP-WEIXIN
	return true;
	// #endif
}