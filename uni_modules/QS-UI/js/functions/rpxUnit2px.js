/**
 * rpx 转 px 数值，例: 36rpx -> uni.upx2px(36), 36px -> 36
 * @param {Object} data
 */
module.exports = function (data) {
	if(!data) return 0;
	if(typeof data === 'number') return data;
	data = String(data);
	const rpxReg = /(\d+)rpx/;
	const pxReg = /(\d+)px/;
	const rpxValue = data.match(rpxReg);
	if(rpxValue) return Number(uni.upx2px(rpxValue[1]));
	const pxValue = data.match(pxReg);
	if(pxValue) return Number(pxValue[1]);
	return Number(data);
}