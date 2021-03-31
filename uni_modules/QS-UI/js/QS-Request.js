import {
	log
} from '@/QS-UI-CONFIG/index.js';
import {
	isFn,
	isPromise
} from './baseUtil.js';
import getField from './functions/getField.js';
import renderUrlData from './functions/renderUrlData.js';
import {
	showLoading,
	hideLoading
} from './functions/loading.js';
import {
	interfaces
} from '@/QS-UI-CONFIG/config/apis.js';
import {
	checkLogin
} from '@/QS-UI-CONFIG/config/index.js';
import {
	checkRes,
	setConfig,
	checkFail,
	requestCatch,
} from '@/QS-UI-CONFIG/config/request.js';
import {
	QSDebounce,
	unlock
} from './functions/QSDebounce.js';

function QSRequest(args = {}) {
	let {
		name,
		useDebounce,
		url,
		urlField,
		sendData = {},
		checkType,
		field,
		check,
		proxyFn,
		loading,
		contentType,
		urlAppendData
	} = args;
	return new Promise(async (resolve, reject) => {
		let nUrl = url || getField(interfaces, urlField);
		const ifUseDebounce = useDebounce && nUrl;
		if (ifUseDebounce) {
			try {
				await new Promise((rs, rj) => {
					QSDebounce({
						key: nUrl,
						success: function() { rs(); },
						fail() { rj(); }
					})
				})
			} catch (e) {
				//TODO handle the exception
				console.log(`接口-${name || nUrl} 正在执行中，直接 return`);
				return;
			}
		}
		try {
			if (loading) showLoading('请稍候');
			if (!sendData.header) sendData.header = {};
			
			switch(contentType) {
				case 'form':
					sendData.header['Content-Type'] = 'application/x-www-form-urlencoded'
					break;
				default:
					sendData.header['Content-Type'] = contentType || 'application/json'
					break;
			}
			if (!sendData.method) {
				sendData.method = 'GET'
			}

			//为了便于示例
			const obj = setConfig(JSON.parse(JSON.stringify({
				url: nUrl,
				...sendData
			})), args);
			if (obj === false) {
				if (ifUseDebounce) unlock(nUrl);
				console.log('主动停止访问')
				return;
			}
			if (urlAppendData) obj.url = renderUrlData(obj.url, obj.data);
			console.log('访问接口, request之前', JSON.stringify(obj))
			request(obj).then(async res => {
				if (ifUseDebounce) unlock(nUrl);
				log(`${name?`${name}-`:''} 接口访问成功: ${JSON.stringify(res)}`);
				if (loading) hideLoading();
				let checkResult = true;
				if (check !== false) {
					checkResult = checkRes({
						res,
						type: checkType
					})
					
					if(isPromise(checkResult)) {
						checkResult = await checkResult;
					}
				}
				console.log('checkResult', checkResult)
				if(typeof checkResult == 'object') {
					if(checkResult.handleType === 'replaceData') {
						log(`接口${name?`-${name}`:''}-替换输出数据`, checkResult.result)
						resolve(checkResult.result);
						return;
					}
				}
				if (checkResult) {
					const data = getField(res, field);
					log('接口访问成功，检验数据成功');
					let result = data;
					if (isFn(proxyFn)) result = proxyFn(data);
					if (isPromise(result)) {
						// log('是promise， 等待返回')
						result.then(R=>{ 
							log(`接口${name?`-${name}`:''}-最终输出数据`, R);
							resolve(R) 
						}).catch(E=>{ 
							log(`catch 接口${name?`-${name}`:''}-最终输出数据`, E);
							reject(E) 
						});
					}else{
						// log('不是promise')
						log(`接口${name?`-${name}`:''}-最终输出数据`, result);
						resolve(result);
					}
				} else {
					log('接口访问成功，但是 检验数据失败 或 不进行校验');
					checkFail(res, args);
					reject(res);
				}
			}).catch(err => {
				if (ifUseDebounce) unlock(nUrl);
				requestCatch(err, args);
				log(`${name?`${name}-`:''} 接口访问失败: ${JSON.stringify(err)}`);
				if (loading) hideLoading();
				log('接口访问失败');
				reject(err);
			})
		} catch (e) {
			//TODO handle the exception
			if (ifUseDebounce) unlock(nUrl);
		}
	})
}


function request(obj = {}) {
	let _this = this;
	return new Promise((resolve, reject) => {
		try {

			log(
				`访问接口 url: ${obj.url}, data: ${JSON.stringify(obj.data)}, method: ${obj.method}, header: ${JSON.stringify(obj.header)}`
			);
			uni.request({
				...obj,
				success(res) {
					if (res.statusCode === 200) {
						resolve(res.data);
					} else {
						reject(res);
					}
				},
				fail(err) {
					reject(err)
				}
			});
		} catch (e) {
			//TODO handle the exception
			reject(e)
		}
	})
}
module.exports = {
	QSRequest,
	request
}
