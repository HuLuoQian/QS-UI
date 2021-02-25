const obj = {	//导出的对象会拓展赋值在$qs核心js里
	changeTabbarItemLang() {
		uni.setTabBarItem({
			index: 0,
			text: uni.$qs.multiLang.getLang('tabbar.js'),
			fail(err) {
				console.log('失败', err)
			}
		})
		uni.setTabBarItem({
			index: 1,
			text: uni.$qs.multiLang.getLang('tabbar.components'),
			fail(err) {
				console.log('失败', err)
			}
		})
	}
}

module.exports = obj