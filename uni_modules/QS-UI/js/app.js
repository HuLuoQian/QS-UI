//公共js

import apis from '@/QS-UI-CONFIG/config/apis.js';
import VALUES from '@/QS-UI-CONFIG/config/values.js';
import CONFIG from '@/QS-UI-CONFIG/index.js';
import $qs from '@/QS-UI-CONFIG/config/$qs.js';
import {
	isNumber,
	isArray,
	isArrayHasLen,
	isFn,
	isObject,
	isPromise,
	isUndef,
	isNull,
	isString,
} from './baseUtil.js';
import rpxUnit2px from './functions/rpxUnit2px.js';
import {
	QSRequest
} from './QS-Request.js';
import {
	QSDebcKeys,
	QSDebounce,
	unlock
} from './functions/QSDebounce.js';
import showModal from './functions/showModal.js';
import toast from './functions/toast.js';
import navigateTo from './functions/navigateTo.js';
import navigateBack from './functions/navigateBack.js';
import getField from './functions/getField.js';
import mergeArg from './functions/mergeArg.js';
import renderUrlData from './functions/renderUrlData.js';
import checkNavCustom from './functions/checkNavCustom.js';
import getSys from './functions/getSys.js';
import handleAddress from './functions/handleAddress.js';
import getArrBehind from './functions/getArrBehind.js';
import {
	showLoading,
	hideLoading,
} from './functions/loading.js';
import previewImage from './functions/previewImage.js';
import number2Duration from './functions/number2Duration.js';
import getLocationQuery from './functions/getLocationQuery.js';
import {
	doPageDemand
} from '@/QS-UI-CONFIG/js/pageDemand.js';
import multiLang from './functions/multiLang.js';
import dateFormat from './functions/dateFormat.js';
import toLine from './functions/toLine.js';
import toHump from './functions/toHump.js';
import getH5TabbarHeight from './functions/getH5TabbarHeight.js';
import toProject from './functions/toProject.js';
import acc from './functions/acc.js';
import deepClone from './functions/deepClone.js';
import countDown from './functions/countDown.js';
import showActionSheet from './functions/showActionSheet.js';
import uuid from './functions/uuid.js';
import canvas from './QS-SharePoster/QS-SharePoster.js';

const Pages = CONFIG.Pages || {};
const launchPath = CONFIG.launchPath;

class pageRootsObj {
	constructor(arg) {
		this.pageRoots = {};
	}

	setPageContext(vm, ContextType) {
		if(ContextType === 'QS-Global-Canvas') {
			this.pageRoots['QS-Global-Canvas'] = vm;
			return;
		}
		const id = this.getParentId(vm);
		if (!this.pageRoots[id]) this.pageRoots[id] = {};
		this.pageRoots[id][ContextType] = vm;
	}

	clearPageContext(vm, ContextType) {
		const id = this.getParentId(vm);
		if (this.pageRoots[id]) {
			if (this.pageRoots[id][ContextType]) this.pageRoots[id][ContextType] = null;
			if (!Object.keys(this.pageRoots[id]).length) this.pageRoots[id] = null;
		}
	}

	getPage(page, ContextType) {
		if(ContextType === 'QS-Global-Canvas') {
			return this.pageRoots['QS-Global-Canvas'];
		}
		const id = this.getId(page);
		return this.pageRoots[id] && this.pageRoots[id][ContextType];
	}

	getParentId(vm) {
		// #ifdef H5
		return vm.$parent.__page__.id;
		// #endif
		// #ifndef H5
		return vm.$parent._uid;
		// #endif
	}

	getId(page) {
		// #ifdef H5
		return page.__page__.id;
		// #endif
		// #ifndef H5
		return page.$vm._uid;
		// #endif
	}
}

const newpageRootsObj = new pageRootsObj();

module.exports = {
	...$qs,
	config: CONFIG,
	STATUS: CONFIG.STATUS,
	QSDebcKeys,
	QSDebounce,
	unlock,

	showModal,
	modal: showModal,

	toast,
	showToast: toast,

	Pages,

	navigateTo,
	go: navigateTo,

	navigateBack,
	back: navigateBack,

	showActionSheet,
	actionSheet: showActionSheet,

	isNumber,
	isArray,
	isArrayHasLen,
	isFn,
	isObject,
	isPromise,
	isUndef,
	isNull,
	isString,
	getField,
	mergeArg,
	renderUrlData,
	checkNavCustom,
	getSys,
	request: QSRequest,
	handleAddress,
	getArrBehind,
	showLoading,
	hideLoading,
	launchPath,
	log: CONFIG.log,
	rpxUnit2px,
	VALUES,
	previewImage,
	number2Duration,
	getLocationQuery,
	doPageDemand,
	multiLang,
	dateFormat,
	toLine,
	toHump,
	apis,
	getH5TabbarHeight,
	toProject,
	acc,
	deepClone,
	countDown,
	canvas,
	uuid,
	pageRoots: newpageRootsObj,
}
