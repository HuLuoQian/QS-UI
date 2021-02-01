//H5获取window.location.href后的数据对象, type 为 splitHash时，在路由模式为hash，在微信授权回调中获取code时可以使用
module.exports = function (type) {
	var result = {};
	// #ifdef H5
	var url = window.location.href; //获取当前url
	console.log('url', url);
	var dz_url = type==='splitHash'?url.split('#')[0]:url; //获取#/之前的字符串
	console.log('dz_url', dz_url);
	if (-1 !== dz_url.indexOf('?')) {
		var cs = dz_url.split('?')[1]; //获取?之后的参数字符串
		console.log('cs', cs);

		var cs_arr = cs.split('&'); //参数字符串分割为数组
		console.log('cs_arr', cs_arr);

		for (var i = 0; i < cs_arr.length; i++) { //遍历数组，拿到json对象
			const item = cs_arr[i];
			console.log('item', item);
			const itemSp = item.split('=');
			console.log('itemSp', itemSp);
			result[itemSp[0]] = itemSp[1];
		}
	}
	// #endif
	return result;
}