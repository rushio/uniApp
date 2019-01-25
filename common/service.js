// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
// 服务器地址
//const SERVICE_URL = 'http://192.168.90.202:8080/';
const SERVICE_URL = 'http://192.168.90.64:8080/';

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
        password: userInfo.password,
		unitid: userInfo.UnitID,
		unitname: userInfo.UnitName
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
    uni.setStorageSync(PONINTS_KEY, JSON.stringify(points));
}

// 获取单位工程
const UNIT_ENGINEERING = 'UNIT_ENGINEERING';
const getUnitEngineeringLists = function() {
	let ret = '';
	ret = uni.getStorageSync(UNIT_ENGINEERING);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}
// 保存单位工程
const setUnitEngineeringLists = function(unit) {
	uni.setStorageSync(UNIT_ENGINEERING, JSON.stringify(unit))
}

// 获取某工点最后一次施工工况日期
const LASTUPLOADDATE = 'LASTUPLOADDATE';
const getLastUploadDate = function() {
	let ret = '';
	ret = uni.getStorageSync(LASTUPLOADDATE);
	if (!ret) {
		ret = '0001-01-01';
	}
	return JSON.stringify(ret);
}
// 设置某工点最后一次施工工况日期
const setLastUploadDate = function(date) {
	uni.setStorageSync(LASTUPLOADDATE, JSON.stringify(date));
}

export default {
	SERVICE_URL,
    addUser,
    getUsers,
	setPoints,
	getPoints,
	setUnitEngineeringLists,
	getUnitEngineeringLists,
	setLastUploadDate,
	getLastUploadDate
}
