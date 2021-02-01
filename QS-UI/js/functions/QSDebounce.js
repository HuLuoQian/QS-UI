import { isFn, isUndef, isNumber } from '../baseUtil.js';
import QSDebounceKeysConfig from '@/QS-UI-CONFIG/config/QSDebounceKeys.js';
const QSDebounceObj = {}
const QSDebcKeys = (function() {
	const keys = {}
	for (let k in QSDebounceKeysConfig) {
		const item = QSDebounceKeysConfig[k]
		keys[item.key] = item.key
	}
	return keys;
})();
const QSDebounce = function({
	key,
	success,
	fail,
	time
} = {}) {
	if (!key && isFn(fail)) fail();
	if (!QSDebounceObj[key]) {
		QSDebounceObj[key] = true;
		if (isFn(success)) success();
		if (isUndef(time)) time = checkKeyTime(key);
		if (isNumber(time)) setTimeout(() => {
			unlock(key);
		}, Number(time));
	} else {
		if (isFn(fail)) fail();
	}
}
const checkKeyTime = function(key) {
	if (!QSDebounceKeysConfig[key]) return
	return QSDebounceKeysConfig[key].time
}
const unlock = function(key) {
	if (!key || typeof key !== 'string') return;
	if (QSDebounceObj[key]) QSDebounceObj[key] = false
}

module.exports = {
	QSDebcKeys,
	QSDebounce,
	unlock
}