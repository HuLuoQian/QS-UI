/**
 * 接口访问前
 * @param {Object} config 接口访问所需参数
 * @param {Object} args	QS-Request拿到的参数
 * 
 * return  Object | Promise
 */
const setConfig = function(config, args) { //config为传给uni.request的参数, args 为传给QS-Request的参数
	return new Promise(rs=>{
		if (args.login) { //判断是否有登录标识
			if (!getApp().globalData.requestLogin) {
				if(args.loading) uni.$qs.hideLoading();	//如果有展示loading 先关闭
				uni.$qs.modal({
					content: '拦截到未登录，是否登录?',
					success(r) {
						if (r.confirm) {
							getApp().globalData.requestLogin = true;	//一般是跳转登录页面
							rs(config);
						}else{
							rs(false);
						}
					}
				})
				return;
			}
		}
		rs(config);
	})
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
 * return Object 目前，若Object.handleType为resolveData, 则该次访问将Object.result作为最终数据
 * 
 * return  Boolean | Object | Promise
 */
const checkRes = function(obj) { //对于返回数据的健壮性判断
	return new Promise(rs=>{	//可以return一个Promise对象达到异步效果，比如 检测到登录过期，可以先调用登录接口然后再次调用uni.$qs.request(args), 把最终数据直接resolve出去
		let {
			res,
			type,
			args
		} = obj;
		if (!res) return false;
		
		if(res.code == '登录态过期标识') {
			// 执行登录操作，并重新调用uni.$qs.request(args)
			// 可以 rs 一个对象出去, { handleType: 'resolveData', result: data }, handleType: 'resolveData', 表示该操作可以直接将result数据resolve
			rs(true);
		}
		
		type = type !== undefined ? type : 'code200';
		switch (type) {
			case 'code200':
				if (res) {
					if (res.code == 200) {
						rs(true);
					} else {
						rs(false);
					}
				} else {
					rs(false);
				}
				break;
			default:
				rs(true);
				break;
		}
	})
}

module.exports = {
	setConfig,
	checkFail,
	requestCatch,
	checkRes
}
