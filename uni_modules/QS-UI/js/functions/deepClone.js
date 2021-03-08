module.exports = function deepClone(source) {	//摘自网上， 稍作改动
	if (!source && typeof source !== 'object') {
		throw new Error('error arguments', 'deepClone')
	}
	if(source.constructor === Date) return new Date(source);
	const targetObj = source.constructor === Array ? [] : {}
	Object.keys(source).forEach(keys => {
		if (source[keys] && typeof source[keys] === 'object') {
			if (source[keys].constructor === Date) {
				targetObj[keys] = new Date(source[keys]);
			} else {
				targetObj[keys] = deepClone(source[keys]);
			}
		} else {
			targetObj[keys] = source[keys]
		}
	})
	return targetObj
}
