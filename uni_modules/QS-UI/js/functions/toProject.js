import projects from '@/QS-UI-CONFIG/config/toProjects.js';
module.exports = function (target) {
	let ps;
	if(typeof projects === 'function') {
		ps = projects();
	}else{
		ps = projects;
	}
	let val;
	// #ifdef H5
	val = ps.H5[target];
	// #endif
	
	// #ifdef H5
	console.log('跳转项目， 所有项目:', ps);
	console.log('跳转项目， 目标值:', val);
	if(!val) {
		console.log('目标值不存在')
		return;
	} 
	window.location.href = val;
	// #endif
}