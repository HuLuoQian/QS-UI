import rpxUnit2px from './rpxUnit2px.js';
module.exports = function (obj = {}, cb) {
	const Sys = uni.getSystemInfoSync();
	// console.log(Sys)
	const {
		vm,
		hasNavigationBar = false,	//头条小程序需传
		offsetTop = 0,
		viewportHeight = 1,
		nodes = []
	} = obj;
	if(!vm) { console.log('请传vm为当前vue实例this');console.warn('请传vm为当前vue实例this'); };
	if(!nodes || !nodes.length) { console.log('nodes为空！');console.warn('nodes为空！'); return; };
	offsetTop = rpxUnit2px(offsetTop);
	const top = Number(offsetTop);
	const obs = [];
	for (let i = 0; i < nodes.length; i++) {
		const item = nodes[i];
		const ob = uni.createIntersectionObserver(vm);
		let bottom = -Sys.windowHeight + top + Number(viewportHeight);
		
		// 字节小程序 开发者模拟器 需要如下代码, 真机未测试
		// #ifdef MP-TOUTIAO
		bottom += ((String(hasNavigationBar) == 'true'?(44 + Sys.statusBarHeight):0));
		// #endif
		
		// 支付宝小程序 开发者工具与真机表现不一致 开发者工具模拟器需要打开下面的注释, 真机不需要, 以真机为主
		// #ifdef MP-ALIPAY
		// bottom += ((String(this.hasNavigationBar) == 'true'?(Sys.titleBarHeight + Sys.statusBarHeight):0));
		// #endif
		
		ob.relativeToViewport({
			top: -top,
			bottom: bottom
		})
		ob.observe(item.node || item, res => {
			// console.log(res)
			if (res.intersectionRatio > 0) {
				if(cb && typeof cb === 'function') cb(i)
			}
		});
		obs.push(ob);
	}
	// console.log(obs)
	return obs;
}