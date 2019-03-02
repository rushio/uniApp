const now = new Date();

const time = now.getTime(); // 1547608579197

// 2019-01-16
const date = function() {
	var month = now.getMonth() + 1
	if (1 === month.toString().length) {
		month = "0" + month;
	}
	var day = now.getDate();
	if (1 === day.toString().length) {
		day = "0" + day;
	}
	return now.getFullYear() + "-" + month + "-" + day;
}

//比较日期大小
const compareDate = function(logintime, logouttime) {
	var arys1 = new Array();
	var arys2 = new Array();
	if (logintime != null && logouttime != null) {
		arys1 = logintime.split('-');
		var logindate = new Date(arys1[0], parseInt(arys1[1] - 1), arys1[2]);
		arys2 = logouttime.split('-');
		var logoutdate = new Date(arys2[0], parseInt(arys2[1] - 1), arys2[2]);
		if (logindate >= logoutdate) {
			return false;
		} else {
			return true;
		}
	}
}

export default {
	now,
	time,
	date,
	compareDate
}
