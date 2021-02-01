import mergeArg from './mergeArg.js';
module.exports = function() {
	const config = mergeArg({
		title: '',
		icon: 'none',
		image: '',
		mask: false,
		duration: 1500,
		position: 'center',
		success: () => {},
		fail: () => {}
	}, arguments)
	config.title = String(config.title)
	uni.showToast(config)
}