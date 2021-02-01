import {
	isString,
	isArray,
	isObject
} from '../js/baseUtil.js';
import MP_styleObj2String from '../js/functions/MP_styleObj2String.js';
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
					const nclass = this.compClass;
					const QS_nCompClass = this.QS_nCompClass;
					if (QS_nCompClass) {
						if (nclass) {
							if (isString(nclass)) {
								return `${nclass} ${QS_nCompClass}`;
							} else if (isArray(nclass)) {
								return [...nclass, QS_nCompClass];
							} else if (isObject(nclass)) {
								return [nclass, QS_nCompClass];
							} else {
								return QS_nCompClass;
							}
						} else {
							return QS_nCompClass;
						}
					} else {
						return nclass;
					}
				},
				getStyle() {
					const style = this.compStyle;
					const QS_nCompStyle = this.QS_nCompStyle;
					return MP_styleObj2String([style, QS_nCompStyle]);
				}
			}
		}
	}
}
