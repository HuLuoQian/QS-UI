
module.exports = function(arr, index) {	//获取数组前面有值的数据
	if (arr.length === 0) return '';
	if (arr[index]) {
		return arr[index];
	}
	if (index <= arr.length) {
		return getArrBehind(arr, index + 1)
	} else {
		return '';
	}
}