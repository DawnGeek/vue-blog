var express = require('express');
var router = express.Router();
var hasOwnProperty = require('has-own-property-x');
var Unique = require('../common/Unique');
var createTime = require('../common/creatTime');
var {
	sqlHandle, //除查询外的其他操作
	readHandle, //读取操作
	searchHandle, //检测有无某条数据，有为false
	searchHandleNormal, //检测有无某条数据，有为true
	query //基本操作
} = require("../../config/db_connect");


// 前台获取所有的文章
router.get('/getArticleAll', (req, res, next) => {
	var getArticleAll = `select * from article`;
	async function sqlAllHandle() {
		let data = await readHandle(getArticleAll);
		return {
			code: "2021",
			msg: "获取所有文章成功",
			data
		}
	}
	sqlAllHandle().then((data) => {
		res.send(data)
	}).catch((err) => {
		res.send({
			code: "2022",
			msg: "获取所有文章失败"
		})
	})
});

module.exports = router;