import { isObject } from '../baseUtil.js';
module.exports = function(obj = {}, args) {	//合并参数
	// console.log('args', args)
	const arg = args[0];
	if (args.length === 1 && isObject(arg)) {
		obj = { 
			...obj,
			...arg
		}
		// console.log('obj', obj)
	} else {
		const configArr = Object.keys(obj);
		for (let i = 0; i < args.length; i++) {
			obj[configArr[i]] = args[i]
		}
	}
	return obj;
}

