/**
 * 跳转页面
 */
import mergeArg from './mergeArg.js';
import getField from './getField.js';
import renderUrlData from './renderUrlData.js';
import { QSDebounce, QSDebcKeys } from './QSDebounce.js';
import { isString, isObject, isFn } from '../baseUtil.js';
import Pages from '@/QS-UI-CONFIG/config/Pages.js';
import { beforNext } from '@/QS-UI-CONFIG/config/navigate.js';
import toast from './toast.js';

module.exports = function() {
	console.log(arguments);
	const obj = mergeArg({
		url: '',
		data: {},
		check: null,
		animationType: '',
		useQSDebounce: false,
		success: undefined,
		fail: undefined,
		complete: undefined,
		type: 'navigateTo',
	}, arguments);
	let {
		type,
		url,
		data,
		animationType,
		useQSDebounce,
		success,
		fail,
		complete
	} = obj;
	const next = function() {
		console.log('url',url);
		let goObj = {},goUrl,goFn;
		if (isString(url)) {
			console.log('是String')
			if(-1 === url.indexOf('/')) {
				const d = getField(Pages, url);
				console.log('链式获取对象:', d);
				if(isObject(d)) {
					goObj = d;
				}else{
					goObj.url = d;
				}
			}else{
				// console.log('正常路径');
				goObj.url = url;
			}
		} else if (isObject(url)) {
			console.log('是Object')
			// if(-1 === url.url.indexOf('/')) {
			// 	goObj.url = getField(Pages, url.url);
			// }else{
				goObj = { ...url } || {};
				if(-1 === goObj.url.indexOf('/')) goObj = JSON.parse(JSON.stringify(getField(Pages, goObj.url)));
			// }
		} else {
			console.log('参数类型错误, 无法跳转');
			toast('参数类型错误, 无法跳转');
			return;
		}
		console.log('goObj', goObj);
		if(!goObj.url) goObj.url = url;
		
		const newGoObj = beforNext(JSON.parse(JSON.stringify(goObj)), obj);
		console.log('newGoObj', newGoObj);
		if(newGoObj === false) return;
		if(typeof newGoObj === 'object') goObj = newGoObj;
		console.log('goObj', goObj);
		
		goObj.url = goObj.url || '';
		goUrl = goObj.url;
		if (goObj.tabbar) {
			goFn = uni.switchTab
		} else {
			if(type === 'ngt') type = 'navigateTo';
			if(type === 'rdt') type = 'redirectTo';
			if(type === 'rl') type = 'reLaunch';
			if(['redirectTo', 'navigateTo', 'reLaunch'].includes(type)) {
				if(type !== 'reLaunch') {
					goUrl = renderUrlData(goObj.url, data);
				}
				goFn = uni[type];
			} else {
				console.log('跳转type 不正确，值应为redirectTo, navigateTo, reLaunch 之一');
				if(isFn(fail)) fail();
				return;
			}
		}
		goFn({
			url: goUrl,
			success(r) {
				console.log('跳转页面成功:', r)
				if(isFn(success)) success(r);
			},
			fail(r) {
				console.log('跳转页面失败:', r)
				if(isFn(fail)) fail(r);
			},
			complete(r) {
				if(isFn(complete)) complete(r);
			},
			// #ifdef APP-PLUS
			animationType: animationType || 'pop-in',
			animationDuration: 200
			// #endif
		});
	}
	if (useQSDebounce) {
		QSDebounce({
			key: QSDebcKeys.openWindow,
			success() {
				next();
			},
			fail() {
				toast(QSDebcKeys.openWindow.failText || '操作太频繁')
			}
		})
	} else {
		next();
	}
}