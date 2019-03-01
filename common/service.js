// 管理账号信息
const USERS_KEY = 'USERS_KEY';
const STATE_KEY = 'STATE_KEY';
// 服务器地址
// const SERVICE_URL = 'http://192.168.90.202:8081/'; // 贾经理
// const SERVICE_URL = 'http://192.168.191.1:8080/'; // 本机ip
const SERVICE_URL = 'http://sz-demo.telsafe.com.cn/'; // 域名

// 获取用户信息
const getUsers = function() {
	let ret = '';
	ret = uni.getStorageSync(USERS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}
// 保存用户信息
const addUser = function(userInfo) {
	/* let users = getUsers();
    users.push({
        account: userInfo.account,
        password: userInfo.password,
		unitid: userInfo.UnitID,
		unitname: userInfo.UnitName,
		token: userInfo.Token
    }); */
	uni.setStorageSync(USERS_KEY, JSON.stringify(userInfo));
}
// 清除用户信息
const removeUser = function() {
	uni.removeStorageSync(USERS_KEY)
	uni.clearStorageSync();
}

// 获取“工点”信息
const PONINTS_KEY = 'PONINTS_KEY';
const getPoints = function() {
	let ret = '';
	ret = uni.getStorageSync(PONINTS_KEY);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}
// 保存“工点”信息
const setPoints = function(points) {
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

// 获取所有没有提交工况检查记录
const ALLCONDITION = 'ALLCONDITION';
const getAllCondition = function() {
	let ret = '';
	ret = uni.getStorageSync(ALLCONDITION);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret)
}
// 保存所有没有提交工况检查记录
const setAllCondition = function(all) {
	let allCon = getAllCondition();
	allCon.push(all);
	uni.setStorageSync(ALLCONDITION, JSON.stringify(allCon))
}
// 清除所有没有提交工况检查记录
const removeAllCondition = function() {
	uni.removeStorageSync(ALLCONDITION)
}

// 获取上传图片后返回数据集合
const IMGDATAARR = 'IMGDATAARR';
const getImgDataArr = function() {
	let ret = '';
	ret = uni.getStorageSync(IMGDATAARR);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret)
}
// 保存上传图片后返回数据集合
const setImgDataArr = function(img) {
	let imgArr = getImgDataArr();
	imgArr.push({
		FileOldName: img.FileOldName,
		FileNewName: img.FileNewName,
		Url: img.Url,
		FileSize: img.FileSize,
		FileType: img.FileType,
	});
	uni.setStorageSync(IMGDATAARR, JSON.stringify(imgArr));
}
// 清除保存图片集合
const removeImgArr = function() {
	uni.removeStorageSync(IMGDATAARR)
}

// 获取某分区下的分部分项以及工序
const UNITENGINEERITEMS = 'UNITENGINEERITEMS';
const getUnitEngineerItems = function() {
	let ret = '';
	ret = uni.getStorageSync(UNITENGINEERITEMS);
	if (!ret) {
		ret = '[]';
	}
	return JSON.parse(ret);
}
// 保存某分区下的分部分项以及工序
const setUnitEngineerItems = function(unitItem) {
	uni.setStorageSync(UNITENGINEERITEMS, JSON.stringify(unitItem));
}

export default {
	SERVICE_URL,
	addUser,
	getUsers,
	removeUser,
	setPoints,
	getPoints,
	setUnitEngineeringLists,
	getUnitEngineeringLists,
	setLastUploadDate,
	getLastUploadDate,
	setAllCondition,
	getAllCondition,
	removeAllCondition,
	setImgDataArr,
	getImgDataArr,
	removeImgArr,
	setUnitEngineerItems,
	getUnitEngineerItems
}
