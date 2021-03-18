import { isArray, isObject } from '../baseUtil.js';

module.exports = function classObj2String (item) {
	if(!item) return '';
	if(isArray(item)) {
		let arrClass = '';
		for(let i = 0; i < item.length; i++) {
			arrClass += ` ${classObj2String(item[i])} `;
		}
		return arrClass;
	}else if(isObject(item)) {
		return Object.keys(item).filter(ite=>!!item[ite]).join(' ');
	}
	return item || '';
}