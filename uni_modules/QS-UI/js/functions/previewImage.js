/**
 * 预览图片，如果urls字段是字符串，相当于一张图片地址，则自动转数组
 */
import mergeArg from './mergeArg.js';
import { isArray } from '../baseUtil.js';
module.exports = function () {
	const obj = mergeArg({
		urls: [], 
		current: 0, 
		indicator: 'default', 
		loop: false, 
		longPressActions: null, 
		success: ()=>{}, 
		fail: ()=>{}, 
		complete: ()=>{} 
	}, arguments);
	if(!isArray(obj.urls)) obj.urls = [obj.urls];
	uni.previewImage(obj)
}