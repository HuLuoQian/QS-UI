module.exports = {
	beforNext: function(goObj, args) {	//路由跳转之前, return false则终止跳转
		if(goObj.login && !getApp().globalData.isLogin) {
			uni.$qs.showModal({
				content: `拦截到未登录, 是否登录？`,
				showCancel: true,
				success(res) {
					if(res.confirm) {
						getApp().globalData.isLogin = true;
						uni.$qs.showModal({
							content: `登录成功，是否跳转页面？`,
							showCancel: true,
							success(res) {
								if(res.confirm) {
									uni.$qs.navigateTo(args);
								}
							}
						})
					}
				}
			})
			return false;
		}
	}
}