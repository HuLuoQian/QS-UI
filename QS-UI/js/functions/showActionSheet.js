import mergeArg from './mergeArg.js';
module.exports = function () {
	const config = mergeArg({
		itemList: [],
		itemColor: '#000000',
		popover: null,
		success: () => {},
		fail: () => {},
		complete: () => {}
	}, arguments)
	uni.showActionSheet(config)
}