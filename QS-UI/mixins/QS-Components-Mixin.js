import {
	isString,
	isArray,
	isObject
} from '../js/baseUtil.js';
import classObj2String from '../js/functions/classObj2String.js';
import styleObj2String from '../js/functions/styleObj2String.js';
const styleString2Object = function (str) {
	if(typeof str === 'string') {
		str = str.split(';').filter(i=>!!i).map(item=>{ const ite = item.split(':').map(it=>it.trim()); return { [ite[0]]: ite[1] }  });
	}
	return str;
}
module.exports = function() {
	const props = {
		'compClass': {
			type: [String, Array, Object],
			default: ''
		},
		'compStyle': {
			type: [String, Array, Object],
			default: ''
		}
	}
	return {
		props: props,
		mixin: {
			// #ifndef MP-ALIPAY
			props: props,
			// #endif
			computed: {
				getClass() {
					return `${classObj2String(this.compClass)} ${classObj2String(this.QS_nCompClass)}`
				},
				getStyle() {
					return `${styleObj2String(this.compStyle)};${styleObj2String(this.QS_nCompStyle)};`
				}
			}
		}
	}
}
