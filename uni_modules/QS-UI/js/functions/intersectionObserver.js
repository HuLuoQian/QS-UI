import rpxUnit2px from './rpxUnit2px.js';
import { isObject, isString } from '../baseUtil.js';
module.exports = function(obj = {}, intersection, unIntersection) {
	const Sys = uni.getSystemInfoSync();
	// console.log(Sys)
	let {
		vm,
		hasNavigationBar = false, //在原生导航栏页面头条小程序需传true
		offsetTop = 0,
		viewportHeight = 1,
		relativeToSelector = undefined,
		margins = {},
		options = {},
		nodes = []
	} = obj;
	obj.Sys = Sys;
	obj.offsetTop = rpxUnit2px(offsetTop);
	if (!vm) {
		console.log('请传vm为当前vue实例this');
		console.warn('请传vm为当前vue实例this');
	};
	if (!nodes || !nodes.length) {
		console.log('nodes为空！');
		console.warn('nodes为空！');
		return;
	};
	if(isObject(nodes) || isString(nodes)) return createIntersectionObserver(nodes, obj, intersection, unIntersection);
	const obs = [];
	for (let i = 0; i < nodes.length; i++) {
		const item = nodes[i];
		obs.push(createIntersectionObserver(item, obj, intersection, unIntersection, i));
	}
	// console.log(obs)
	return obs;
}

function createIntersectionObserver(item, obj = {}, intersection, unIntersection, i) {
	let {
		vm,
		hasNavigationBar = false, //在原生导航栏页面头条小程序需传true
		offsetTop = 0,
		viewportHeight = 1,
		relativeToSelector = undefined,
		margins = {},
		options = {},
		nodes = [],
		Sys
	} = obj;
	const top = Number(offsetTop);
	const ob = uni.createIntersectionObserver(vm, options);
	let bottom = -Sys.windowHeight + top + Number(viewportHeight);

	// 字节小程序 开发者模拟器 需要如下代码, 真机未测试
	// #ifdef MP-TOUTIAO
	bottom += ((String(hasNavigationBar) == 'true' ? (44 + Sys.statusBarHeight) : 0));
	// #endif

	// 支付宝小程序 开发者工具与真机表现不一致 开发者工具模拟器需要打开下面的注释, 真机不需要, 以真机为主
	// #ifdef MP-ALIPAY
	// bottom += ((String(this.hasNavigationBar) == 'true'?(Sys.titleBarHeight + Sys.statusBarHeight):0));
	// #endif

	if (relativeToSelector) {
		ob.relativeTo(relativeToSelector, margins);
	} else {
		ob.relativeToViewport({
			top: -top,
			bottom: bottom,
			...margins
		})
	}
	ob.observe(item.node || item, res => {
		// console.log(res)
		if (res.intersectionRatio > 0) {
			if (intersection && typeof intersection === 'function') intersection(res, i);
		} else {
			if (unIntersection && typeof unIntersection === 'function') unIntersection(res, i);
		}
	});
	return ob;
}
