module.exports = function () {
	let h = 0;
	// #ifdef H5
	h = document.getElementsByClassName('uni-tabbar')[0].offsetHeight;
	// #endif
	h = h || 0;
	console.log('获取tabbar高度:' + h);
	return h;
}