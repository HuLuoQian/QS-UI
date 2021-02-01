/**
 * 数值转中文时间, 摘自网上
 * @param {Number} my_time 时间值
 */
module.exports = function(my_time) {
	var days = my_time / 1000 / 60 / 60 / 24;
	var daysRound = Math.floor(days);
	var hours = my_time / 1000 / 60 / 60 - 24 * daysRound;
	var hoursRound = Math.floor(hours);
	var minutes = my_time / 1000 / 60 - 24 * 60 * daysRound - 60 * hoursRound;
	var minutesRound = Math.floor(minutes);
	var seconds =
		my_time / 1000 -
		24 * 60 * 60 * daysRound -
		60 * 60 * hoursRound -
		60 * minutesRound;
	var time = "";
	seconds = Math.floor(seconds);
	if (daysRound) {
		time = daysRound + "天" + hoursRound + "小时" + minutesRound + "分钟" + seconds + "秒";
	} else if (!daysRound && hoursRound) {
		time = hoursRound + "小时" + minutesRound + "分钟" + seconds + "秒";
	} else if (!daysRound && !hoursRound && minutesRound) {
		time = minutesRound + "分钟" + seconds + "秒";
	} else if (!daysRound && !hoursRound && !minutesRound && seconds) {
		time = seconds + "秒";
	}
	// var time = hoursRound + ":" + minutesRound + ":" + seconds;
	return time;
}
