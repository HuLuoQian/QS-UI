import mergeArg from './mergeArg.js';
module.exports = function() {
	const config = mergeArg({
		title: '',
		content: '',
		showCancel: false,
		cancelText: '取消',
		cancelColor: '',
		confirmText: '确定',
		confirmColor: '',
		success: () => {},
		fail: () => {},
		complete: () => {}
	}, arguments)
	uni.showModal(config)
}