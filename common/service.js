// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
// 服务器地址
const SERVICE_URL = 'http://192.168.90.202:8080/';

// 获取用户信息
const getUsers = function () {
    let ret = '';
    ret = uni.getStorageSync(USERS_KEY);
    if (!ret) {
        ret = '[]';
    }
    return JSON.parse(ret);
}
// 保存用户信息
const addUser = function (userInfo) {
    let users = getUsers();
    users.push({
        account: userInfo.account,
        password: userInfo.password
    });
    uni.setStorageSync(USERS_KEY, JSON.stringify(users));
}

// 获取“工点”信息
const PONINTS_KEY = 'PONINTS_KEY';
const getPoints = function(){
	let ret = '';
	ret = uni.getStorageSync(PONINTS_KEY);
	if (!ret) {
	    ret = '[]';
	}
	return JSON.parse(ret);
}
// 保存“工点”信息
const setPoints = function (points) {
    let point = getPoints();
    point.push({
        points: points
    });
    uni.setStorageSync(PONINTS_KEY, JSON.stringify(point));
}

export default {
	SERVICE_URL,
    addUser,
    getUsers,
	setPoints,
	getPoints
}
