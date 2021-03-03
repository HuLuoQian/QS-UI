module.exports = function(u, d) {
	let c = '';
	let n = 0;
	if (d)
		for (let i in d) {
			let itemd = d[i];
			if (typeof itemd === 'object') {
				itemd = JSON.stringify(itemd);
			}
			if (n > 0)
				c += '&' + i + '=' + itemd;
			else
				c += '?' + i + '=' + itemd;
			++n;
		}
	return u + c;
}