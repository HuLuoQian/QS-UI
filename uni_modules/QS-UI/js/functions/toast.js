import mergeArg from './mergeArg.js';
module.exports = function() {
	const config = mergeArg({
		title: '',
		duration: 1500,
		mask: false,
		icon: 'none',
		image: '',
		position: 'center',
		success: () => {},
		fail: () => {},
		complete: () => {}
	}, arguments)
	config.title = String(config.title)
	uni.showToast(config)
}