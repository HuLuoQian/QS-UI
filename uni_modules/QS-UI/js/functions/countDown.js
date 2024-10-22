import number2Duration from './number2Duration.js';
import uuid from './uuid.js';

const countDownObjs = {};

module.exports = function (config = {}) {
	let { 
		id, 
		beginDate, 
		endDate,
		text = '确定',
		aboutToBeginText = '距离开始还有',
		aboutToEndText = '距离结束还有',
		endedText = '已结束',
		showEndThreshold = true,
		showEndThresholdTime = (1000 * 60 * 60 * 24 * 1),
		intervalTime = 100
	} = config;
	id = id || uuid();
	const countDownObj = {};
	if(countDownObjs[id]) {
		const curObj = countDownObjs[id];
		if(curObj.fn) clearInterval(curObj.fn);
	}
	if(!beginDate || !endDate) {
		countDownObj.text = text;
		countDownObj.status = 2;
		countDownObjs[id] = countDownObj;
		return countDownObj;
	}
	const now = new Date();
	const bgDate = new Date(beginDate);
	const edDate = new Date(endDate);
	if (now < bgDate) {
		countDownObj.text = `${aboutToBeginText} ${number2Duration(bgDate - now)}`;
		countDownObj.status = 1;
	} else if (now >= bgDate && now < edDate) {
		countDownObj.status = 2;
		if (edDate - now < 1000 * 60 * 60 * 24 * 1) {
			countDownObj.text = `${aboutToEndText} ${number2Duration(edDate - now)}`;
		} else {
			countDownObj.text = text;
		}
	} else {
		countDownObj.text = endedText;
		countDownObj.status = 3;
	}
	countDownObj.fn = setInterval(() => {
		const nNow = new Date();
		if (nNow < bgDate) {
			countDownObj.text = `${aboutToBeginText} ${number2Duration(bgDate - nNow)}`;
			countDownObj.status = 1;
		} else if (nNow >= bgDate && nNow < edDate) {
			countDownObj.status = 2;
			if (showEndThreshold && (edDate - nNow) < showEndThresholdTime) {
				countDownObj.text = `${aboutToEndText} ${number2Duration(edDate - nNow)}`;
			} else {
				countDownObj.text = text;
			}
		} else {
			countDownObj.text = endedText;
			countDownObj.status = 3;
			if(countDownObj.fn) {
				clearInterval(countDownObj.fn);
				countDownObj.fn = null;
			}
		}
	}, intervalTime);
	countDownObj.stop = function () { clearInterval(countDownObj.fn); }
	countDownObjs[id] = countDownObj;
	return countDownObj;
}