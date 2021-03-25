import {
	isFn,
	isPromise
} from '../js/baseUtil.js';
import {
	globalData
} from '@/QS-UI-CONFIG/config/index.js';
import VALUES from '@/QS-UI-CONFIG/config/values.js';
import CONFIG from '@/QS-UI-CONFIG/index.js';
import multiLang from '../js/functions/multiLang.js'
(function(m) {
	if (CONFIG.mixins) {
		const mixin = {};
		const methods = {};
		const filters = {};

		if (CONFIG.mixins.useOnPullDownRefresh) {
			mixin.onPullDownRefresh = function() {
				if (isFn(this[VALUES.mixins.pullDownRefreshFnName])) {
					const result = this[VALUES.mixins.pullDownRefreshFnName]();
					let oldTime = +new Date();
					if (isPromise(result)) {
						result
							.then(() => {
								const now = +new Date();
								const diff = (now - oldTime);
								if (diff < CONFIG.stopPullDownRefreshDuration) {
									const time = CONFIG.stopPullDownRefreshDuration - diff;
									setTimeout(() => {
										uni.stopPullDownRefresh();
									}, time)
								} else {
									uni.stopPullDownRefresh();
								}
							})
							.catch(() => {
								uni.stopPullDownRefresh();
							})
					} else {
						console.log(`刷新函数请return一个Promise对象`);
					}
				} else {
					console.log(`页面上没有找到${VALUES.mixins.pullDownRefreshFnName}方法, 请手动创建并return一个Promise对象`);
				}
			}
		}


		// methods
		if (CONFIG.mixins.useNavigateTo) {
			methods[VALUES.mixins.navigateTo] = function() {
				const filterArguments = []
				for (let i = 0; i < arguments.length; i++) {
					if (arguments[i] === undefined) break;
					filterArguments.push(arguments[i]);
				}
				if (CONFIG.SETIN_UNI) {
					uni[CONFIG.QSUI_JS_NAME].navigateTo(...filterArguments);
				} else if (CONFIG.SETIN_VUE) {
					this[CONFIG.QSUI_JS_NAME].navigateTo(...filterArguments);
				} else {
					console.log('没有找到$qs对象');
					console.warn('没有找到$qs对象');
				}
			}
		}

		if (CONFIG.mixins.useGetQuery) {
			methods[VALUES.mixins.getQuery] = function(elements, fields = {
				size: true
			}) {
				let view;
				// #ifdef MP-ALIPAY
				view = uni.createSelectorQuery();
				// #endif
				// #ifndef MP-ALIPAY
				view = uni.createSelectorQuery().in(this);
				// #endif
				if (Array.isArray(elements)) {
					elements.forEach(item => view.select(item).fields(fields));
				} else {
					view.select(elements).fields(fields);
				}
				return new Promise((rs, rj) => {
					view.exec(data => {
						rs(data);
					})
				})
			}
		}

		function onPageScroll(e) {
			handleScroll(e.scrollTop);
		}

		function handleScroll(scrollTop) {
			const pages = getCurrentPages();
			const page = pages[pages.length - 1];
			let backTopVm = uni.$qs.pageRoots.getPage(page, 'QS-BackTop');
			// let backTopVm = uni.$qs.pageRoots.getCurrentPageContext('QS-BackTop');
			if (backTopVm) {
				backTopVm = backTopVm.getRoot();
				if (backTopVm)
				if (scrollTop > CONFIG.backTopShowScrollTop) {
					if (!backTopVm.showBl) backTopVm.show();
				} else {
					if (backTopVm.showBl) backTopVm.hide();
				}
			}
			// #ifndef APP-NVUE
			let nodeNavVm = uni.$qs.pageRoots.getPage(page, 'QS-NodeNav');
			if (nodeNavVm) {
				nodeNavVm.setScrollTop(scrollTop);
			}
			// #endif
		}


		if (CONFIG.mixins.usePageScroll) {
			mixin.onPageScroll = onPageScroll;
		}

		mixin.methods = methods;

		if (CONFIG.mixins.useOnShareAppMessage)
			mixin.onShareAppMessage = function() {
				return this[VALUES.mixins.onShareAppMessageData];
			}
		//exports
		m['exports'] = function(isNvue) {
			if (isNvue) {
				if (CONFIG.multiLang.NVUE_SETIN_FILTER) {
					filters[VALUES.multiLang.filterName] = multiLang.getLang;
				}
				mixin.filters = filters;
			}else{
				mixin.filters = {};
			}
			return mixin
		};
	} else {
		m['exports'] = function () { return {} };
	}
})(module)
