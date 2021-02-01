import CONFIG from '@/QS-UI-CONFIG/index.js';
const launchPath = CONFIG.launchPath;
module.exports = function(delta = 1) { //关闭当前页面，返回上一页面或多级 uni.navigateBack
	if (getCurrentPages().length === 1) {
		try{
			uni.$qs.navigateTo({
				url: launchPath || '/pages/index/index',
				type: 'reLaunch'
			})
		}catch(e){
			//TODO handle the exception
			uni.reLaunch({
				url: launchPath || '/pages/index/index'
			});
		}
	} else {
		uni.navigateBack({
			delta: delta
		});
	}
}