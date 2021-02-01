import { isObject, isArray } from '../baseUtil.js';

module.exports = function (data, fields) {	//.链式字符串获取对象属性方法
	let d = nGetField(data, fields);
	if(d && isObject(d)) {
		if(d.hasOwnProperty('_vnode')) return d;	//如果是vue实例则直接返回
	}
	try{
		return (d && (isObject(d) || isArray(d)))?JSON.parse(JSON.stringify(d)):d;
	}catch(e){
		//TODO handle the exception
		return d;
	}
}

const nGetField = function(data, fields, pattern) { //字符串.获取指定字段数据， 摘自网上，，，
	if (!fields) return data;
	var arr = fields.split('.');
	var key = arr.shift();
	var value = data[key];

	if (value == null) {
		return value;
	} else if (arr.length == 0) {
		if (!pattern) return value;
		var type = Object.prototype.toString.call(value).replace('[object ', '').replace(']', '');
		if (pattern === true) {
			return type;
		} else if (!pattern) {
			return value;
		} else {
			return type == pattern;
		}
	}

	var result = nGetField(value, arr.join('.'), pattern);
	return result;
}