//这一块可以把它分离到外部再引入
import { STATUS } from './index.js';
let baseURL;

switch (STATUS) {	//筛选接口前缀
	case 1:
		baseURL = '';
		break;
	case 2:
		baseURL = '';
		break;
	case 3:
		baseURL = '';
		break;
	default:
		baseURL = '';
		break;
}

const interfaces = { //接口列表

}

module.exports = {
	STATUS,
	baseURL,
	interfaces
}