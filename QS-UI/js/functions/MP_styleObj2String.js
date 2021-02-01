import { isArray, isObject } from '../baseUtil.js';
import toLine from './toLine.js';
module.exports = function (obj) {	//小程序动态绑定style Object类型数据转为String
	// #ifdef MP
	if(isArray(obj)) {
		obj = obj.map(item=>{
			if(item) {
				if(isObject(item)) {
					return Object.keys(item).map(ite=>`${toLine(ite, '-')}: ${item[ite]};`);
				}else{
					return item[item.length - 1] !== ';'?`${toLine(item, '-')};`:item;
				}
			}else{
				return '';
			}
		}).join('');
	}else if(isObject(obj)) {
		obj = Object.keys(obj).map(item=>`${toLine(item, '-')}: ${obj[item]}`).join(';') + ';';
	}
	// #endif
	return obj;
}