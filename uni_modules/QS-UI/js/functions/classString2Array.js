module.exports = function (classStr) {
	if(typeof classStr !== 'string') return classStr;
	if(!classStr) return [];
	return classStr.split(' ');
}