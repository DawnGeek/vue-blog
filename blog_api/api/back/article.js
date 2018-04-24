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

// 添加文章
router.post("/addarticle", (req, res,next) => {
  const {
    name,
    onename,
    twoname,
    disradio,
    recradio,
    takeaway,
    author,
    content
  } = req.body;
  let addSql = "INSERT INTO `blog`.`article` SET  `author` = '" + author + "', `name` = '" + name + "', `onename` = '" + onename + "', `twoname` = '" + twoname + "', `takeaway` = '" + takeaway + "', `content` = '" + content + "', `disradio` = '" + disradio + "', `recradio` = '" + recradio + "', `data` = '" + data + "'";
  console.log(addSql)
  async function sqlAllHandle() {
    await sqlHandle(addSql);
    return {
      code: "2011",
      msg: "插入成功"
    }
  }
  sqlAllHandle().then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send({
        code: "2012",
        msg: "插入失败"
      })
    })
});

router.get("getarticle", (req, res, next) => {
  var getArticle = `select * from article`;

  async function sqlAllHandle() {
    let data = await readHandle(getArticle);
    return {
      code: "2031",
      msg: "获取数据成功",
      data
    }
  }

  sqlAllHandle().then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send({
      code: "2032",
      msg: "获取数据失败"
    })
  })
})

module.exports = router;