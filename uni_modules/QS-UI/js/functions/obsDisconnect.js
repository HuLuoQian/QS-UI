module.exports = function(obj) {
	if(!obj || typeof obj !== 'object') return;
	if (Array.isArray(obj)) {
		obj.forEach(ite => {
			disconnect(ite);
		})
		return;
	}
	disconnect(obj);
}

function disconnect(obj) {
	if (obj && obj.disconnect && typeof obj.disconnect === 'function') {
		obj.disconnect();
	}
}
