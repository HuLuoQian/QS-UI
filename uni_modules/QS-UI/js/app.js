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
import acc from './functions/acc.js';
import deepClone from './functions/deepClone.js';
import countDown from './functions/countDown.js';
import showActionSheet from './functions/showActionSheet.js';
import uuid from './functions/uuid.js';
import canvas from './QS-SharePoster/QS-SharePoster.js';
import intersectionObserver from './functions/intersectionObserver.js';
import obsDisconnect from './functions/obsDisconnect.js';
import pageRootsClass from './functions/pageRoots.js';
import store from './store/index.js';

const Pages = CONFIG.Pages || {};
const launchPath = CONFIG.launchPath;



const newpageRootsObj = new pageRootsClass();

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
	acc,
	deepClone,
	countDown,
	canvas,
	uuid,
	pageRoots: newpageRootsObj,
	intersectionObserver,
	obsDisconnect,
	store
}
