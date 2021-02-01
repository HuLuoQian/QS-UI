import { isString } from '../baseUtil.js';
module.exports = function(address) {	//地址解析
	const addArr = [];
	let endAddStr = '';
	if (address && isString(address)) {
		let index;
		let arr = [
			['省', '市', '自治区', '自治州', '湾', '港', '门'], 
			['辖区', '市', '自治州', '行政区划', '盟', '地区', '县'], 
			['开发区','区', '自治县', '县', '市', '委员会'],
			['号'],
		];
		arr.forEach(itemData => {
			let index = -1;
			let items = JSON.parse(JSON.stringify(itemData));
			// if(addArr.length === 1) {
				if(addArr[0] && addArr[0] === '台湾') items = ['北', '雄', '隆', '中', '南', '竹', '义', '兰', '园', '栗', '化', '投', '林', '东', '莲', '湖'];
				if(addArr[0] && addArr[0] === '香港') items = ['岛', '龙', '界'];
				if(addArr[0] && addArr[0] === '澳门') items = ['半岛', '岛', '城'];
			// }
			// if(addArr.length === 2) {
			// 	if(addArr[0] && addArr[0] === '台湾') items = ['北', '雄', '隆', '中', '南', '竹', '义', '兰', '园', '栗', '化', '投', '林', '东', '莲', '湖'];
			// 	if(addArr[0] && addArr[0] === '香港') items = ['岛', '龙', '界'];
			// 	if(addArr[0] && addArr[0] === '澳门') items = ['半岛', '岛', '城'];
			// }
			const reg = new RegExp(`.+?(${items.join('|')})`, '');
			const item = items.find(ite=>address.indexOf(ite) >= 0);
			index = address.indexOf(item);
			if (index >= 0) {
				const data = address.match(reg)[0];
				addArr.push(data)
				address = address.replace(data, "");
				endAddStr = address;
			} else {
				addArr.push(null)
			}
		})
	}
	if(!addArr[0] && addArr[1] && addArr[2]) addArr.splice(0, 1);
	return {addressArray: addArr, endAddress: endAddStr};
}