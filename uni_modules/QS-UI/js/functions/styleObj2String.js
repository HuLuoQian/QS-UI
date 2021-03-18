import { isArray, isObject } from '../baseUtil.js';
import toLine from './toLine.js';

module.exports = function styleObj2String (item) {
	if(!item) return '';
	if(isArray(item)) {
		let arrStyle = '';
		for(let i = 0; i < item.length; i++) {
			arrStyle += `${styleObj2String(item[i])};`;
		}
	}else if(isObject(item)) {
		return Object.keys(item).map(ite=>`${toLine(ite, '-')}: ${item[ite]}`).join(';') + ';';
	}
	return item || '';
}