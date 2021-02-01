import mergeArg from './mergeArg.js';

const hideLoading = function() {
	uni.hideLoading()
}

const showLoading = function() {
	const config = mergeArg({
		title: '',
		mask: false,
		success: () => {},
		fail: () => {}
	}, arguments);
	config.title = String(config.title)
	uni.showLoading(config)
}
module.exports = {
	hideLoading,
	showLoading
}