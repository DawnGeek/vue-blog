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

router.post('/', function(req, res, next) {
  let {
    enname_one,
    cnname_one,
    enname_two,
    cnname_two
  } = req.body;

  if (enname_one && cnname_one && enname_one && cnname_two) {
    let Id = Unique();
    let oneSql = `insert into one_list(id,enname,cnname,time) value('${Id}','${enname_one}','${cnname_one}','${createTime()}')`;
    let TwoSql = `insert into two_class(id,parent_id,enname,cnname,article_num,time) values('${Unique()}','${Id}','${enname_one}','${cnname_one}','0','${createTime()}')`;
    async function sqlAllHandle() {
      await sqlHandle(oneSql);
      await sqlHandle(TwoSql);
      return {
        code: "2001",
        msg: "插入成功"
      }
    }
    sqlAllHandle().then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send({
        code: "2002",
        msg: "插入失败"
      })
    })
  };
});


module.exports = router;