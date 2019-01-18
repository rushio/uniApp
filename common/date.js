const now = new Date();

const time = now.getTime(); // 1547608579197

const date = now.getFullYear() + "-" + now.getMonth() + 1 + "-" + now.getDate(); // 2019-01-16

export default {
	now,
	time,
	date
}
