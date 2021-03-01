//这一块可以把它分离到外部再引入
import { STATUS } from './index.js';
let baseURL;

switch (STATUS) {	//筛选接口前缀
	case 1:
		baseURL = 'https://unidemo.dcloud.net.cn';
		break;
	case 2:
		baseURL = 'https://unidemo.dcloud.net.cn';
		break;
	case 3:
		baseURL = 'https://unidemo.dcloud.net.cn';
		break;
	default:
		baseURL = 'https://unidemo.dcloud.net.cn';
		break;
}

const interfaces = { //接口列表
	demo: {
		testApi: `${baseURL}/ajax/echo/json`
	}
}

module.exports = {
	STATUS,
	baseURL,
	interfaces
}