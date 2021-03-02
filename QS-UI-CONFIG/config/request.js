/**
 * 接口访问前
 * @param {Object} config 接口访问所需参数
 * @param {Object} args	QS-Request拿到的参数
 */
const setConfig = function(config, args) { //config为传给uni.request的参数, args 为传给QS-Request的参数
	if (args.login) { //判断是否有登录标识
		if (!getApp().globalData.requestLogin) {
			if(args.loading) uni.$qs.hideLoading();	//如果有展示loading 先关闭
			uni.$qs.modal({
				content: '拦截到未登录，是否登录?',
				success(r) {
					if (r.confirm) {
						getApp().globalData.requestLogin = true;	//一般是跳转登录页面
					}
				}
			})
			return false;
		}
	}
	return config;
}

/**
 * 接口访问后校验失败
 * @param {Object} result 接口访问返回数据
 * @param {Object} args	QS-Request拿到的参数
 */
const checkFail = function(result = {}, args = {}) {	//可以统一展示错误信息
	uni.$qs.modal({ content: `校验数据失败: ${JSON.stringify(err)}` })
}

/**
 * 接口访问失败
 * @param {Object} err 接口访问返回数据
 * @param {Object} args	QS-Request拿到的参数
 */
const requestCatch = function(err = {}, args = {}) {	//可以统一展示错误信息
	uni.$qs.modal({ content: `请求错误: ${JSON.stringify(err)}` })
}

/**
 * 接口访问后校验数据
 * @param {Object} obj.res 接口访问返回数据 obj.type 判断返回数据方式
 * return true 则走Promise resolve
 * return false 则走Promise reject
 */
const checkRes = function(obj) { //对于返回数据的健壮性判断
	let {
		res,
		type
	} = obj;
	if (!res) return false;

	type = type !== undefined ? type : 'code200';
	switch (type) {
		case 'code200':
			if (res) {
				if (res.code == 200) {
					return true;
				} else {
					return false;
				}
			} else {
				return false;
			}
			break;
		default:
			return true;
			break;
	}
}

module.exports = {
	setConfig,
	checkFail,
	requestCatch,
	checkRes
}
