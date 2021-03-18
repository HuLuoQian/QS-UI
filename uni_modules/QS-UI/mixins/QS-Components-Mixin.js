import classObj2String from '../js/functions/classObj2String.js';
import styleObj2String from '../js/functions/styleObj2String.js';
import rpxUnit2px from '../js/functions/rpxUnit2px.js';
import CONFIG from '@/QS-UI-CONFIG/index.js';
const QSUI_JS_NAME = CONFIG.QSUI_JS_NAME || '$qs';
// const styleString2Object = function (str) {
// 	if(typeof str === 'string') {
// 		str = str.split(';').filter(i=>!!i).map(item=>{ const ite = item.split(':').map(it=>it.trim()); return { [ite[0]]: ite[1] }  });
// 	}
// 	return str;
// }
var id = 0;
module.exports = function({ componentType, setContext } = {}) {
	var _this;
	const props = {
		'compClass': {
			type: Object,
			default: ()=>({})
		},
		'compStyle': {
			type: Object,
			default: ()=>({})
		},
		fontSize: {
			type: [String, Number],
			default: ''
		}
	}
	return {
		name: componentType || '',
		props: props,
		mixin: {
			// #ifndef MP-ALIPAY
			props: props,
			// #endif
			created() {
				_this = this;
				if(componentType && setContext) uni[QSUI_JS_NAME].pageRoots.setPageContext(this, componentType);
			},
			beforeDestroy() {
				if(componentType && setContext) uni[QSUI_JS_NAME].pageRoots.clearPageContext(this, componentType);
			},
			data() {
				return {
					componentId: `${componentType || 'QS-COMPONENT'}-${id++}`,
					baseFontSize: CONFIG.baseFontSize
				}
			},
			computed: {
				getFontSize() {
					return rpxUnit2px(this.fontSize) || rpxUnit2px(this.baseFontSize);
				},
				getClass() {
					return `${classObj2String(this.compClass.container)} ${classObj2String(this.QS_nCompClass)}`
				},
				getStyle() {
					return `${styleObj2String(this.compStyle.container)};${styleObj2String(this.QS_nCompStyle)};`
				}
			},
			methods: {
				getRoot() {
					return _this;
				},
			},
		}
	}
}
