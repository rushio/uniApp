const now = new Date();

const time = now.getTime(); // 1547608579197

var month= parseInt(now.getMonth()) + 1
const date = now.getFullYear() + "-" + month + "-" + now.getDate(); // 2019-01-16

export default {
	now,
	time,
	date
}
