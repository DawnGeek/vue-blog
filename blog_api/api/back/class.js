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


// 一级类名的添加
router.post('/insertoneclass', function(req, res, next) {
  console.log(req.body)
  let {
    enname_one,
    cnname_one,
    enname_two,
    cnname_two
  } = req.body;

  if (enname_one && cnname_one && enname_one && cnname_two) {
    let Id = Unique();

    // 插入一级分类
    let oneSql = "INSERT INTO `blog`.`one_list` SET `id` = '" + Unique() + "', `enname` = '" + enname_one + "', `cnname` = '" + cnname_one + "', `time` = '" + createTime() + "'";

    // 插入二级分类
    let twoSql = "INSERT INTO `blog`.`two_list` SET `id` = '" + Unique() + "', `parent_id` = '" + Id + "', `enname` = '" + enname_two + "', `cnname` = '" + cnname_two + "', `article_num` = '0', `time` = '" + createTime() + "'";

    // 检测一级分类是否存在
    let testOneClass = `select * from one_list where enname='${enname_one}' OR cnname='${cnname_one}'`;

    // 插入文章
    var createTable = `CREATE TABLE ${enname_one} (LIST INT(11) UNIQUE NOT NULL AUTO_INCREMENT, id VARCHAR(255) UNIQUE PRIMARY KEY, oneId VARCHAR(255), twoId VARCHAR(255), article_name VARCHAR(255), editer VARCHAR(255), content LONGTEXT, time DATETIME, visitors INT, daodu VARCHAR(255), imgsrc VARCHAR(255), recommend TINYINT, art_show TINYINT);`
    console.log(testOneClass)
    async function sqlAllHandle() {
      await searchHandle(testOneClass);
      await sqlHandle(oneSql);
      await sqlHandle(twoSql);
      //await query(createTable);
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


// 二级类名的添加
router.post("/inserttwoclass", (req, res, next) => {
  let {
    Id,
    enname_two,
    cnname_two
  } = req.body;
  if (Id && enname_two && cnname_two) {
    // 检测二级分类是否存在
    let testTwoClass = `select * from two_list where enname='${enname_two}' OR cnname='${cnname_two}'`;

    // 添加二级类名
    let twoSql = "INSERT INTO `blog`.`two_list` SET `id` = '" + Unique() + "', `parent_id` = '" + Id + "', `enname` = '" + enname_two + "', `cnname` = '" + cnname_two + "', `article_num` = '0', `time` = '" + createTime() + "'";

    console.log(testTwoClass)
    async function sqlAllHandle() {
      await searchHandle(testTwoClass)
      await sqlHandle(twoSql);
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
  }
})

// 获取一级分类
router.get("/getoneclass", (req, res, next) => {

  var getOneClass = `select * from one_list`;
  async function sqlAllHandle() {
    let data = await readHandle(getOneClass);
    return {
      code: "2021",
      msg: "获取数据成功",
      data
    }
  }
  sqlAllHandle().then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send({
      code: "2022",
      msg: "获取数据失败"
    })
  })
});


// 获取分类列表
router.get("/getclass", (req, res, next) => {

  var getOneClass = `select * from one_list`
  var getTwoClass = `select * from two_list`

  async function sqlAllHandle() {
    let oneData = await readHandle(getOneClass);
    let twoData = await readHandle(getTwoClass);
    let data = {
      oneData,
      twoData
    }
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

// 删除一级分类
router.post("/deleteoneclass", (req, res, next) => {
  let {
    Id,
    enname_one
  } = req.body;
  if (id, enname_one) {
    let sqlOne = `delete from one_list where id='${id}'`
    let sqlTwo = `delete from two_list where parent_id='${id}'`
    let deleteTable = `drop table ${enname_one}`
    async function sqlAllHandle() {
      await query(sqlOne);
      await query(sqlTwo);
      await query(deleteTable)
      return {
        code: "2041",
        msg: "删除数据成功",
      }
    }
    sqlAllHandle().then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send({
        code: "2042",
        msg: "删除数据失败"
      })
    })
  }
});


// 删除二级分类
router.post("/deletetwoclass", (req, res, next) => {
  let {
    oneId,
    twoId,
    enname_one
  } = req.body
  if (oneId, twoId, enname_one) {
    let selectOneClass = `select * from two_list where parent_id='${oneId}'`
    readHandle(selectOneClass).then((data) => {
      if (data.length > 1) {
        deleteTwoClass(req, res, next)
      } else {
        deleteLastTwoClass(req, res, next)
      }
    })
  }
})


// 更改一级分类
router.post("/setoneclass", (req, res, next) => {
  let {
    oldenname_one,
    enname_one,
    cnname_one
  } = req.body;

  if (oldenname_one, enname_one, cnname_one) {
    let amendArticleTable = `alter table ${oldenname_one} rename ${enname_one}`
    let amendClassOne = `update one_list set enname='${enname_one}',cnname='${cnname_one}'`
    async function sqlAllHandle() {
      await sqlHandle(amendClassOne);
      await sqlHandle(amendArticleTable);
      return {
        code: "2061",
        msg: "获取数据成功",
      }
    }
    sqlAllHandle().then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send({
        code: "2062",
        msg: "获取数据失败"
      })
    })

  }
});


// 二级分类删除最后一条，连带删除当前一级分类，当前文件表

function deleteLastTwoClass(req, res, next) {
  let {
    oneId,
    twoId,
    enname_one
  } = req.body
  let sqlone = `delete * from one_list where id='${oneId}'`
  let sqltwo = `delete * from two_list where parent_id='${oneId}'`
  let deleteTable = `drop table ${enname_one}`
  async function sqlAllHandle() {
    await sqlHandle(sqlone);
    await sqlHandle(sqltwo);
    await query(deleteTable)
    return {
      code: "2051",
      msg: "获取数据成功",
    }
  }
  sqlAllHandle().then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send({
      code: "2052",
      msg: "获取数据失败"
    })
  })
};


// 二级分类删除不是最后一条，只删除二级分类和文章

function deleteTwoClass(req, res, next) {
  let {
    oneId,
    twoId,
    enname_one
  } = req.body
  let deleteTwo = `delete * from two_list where id='${twoId}'`
  let deleteArticle = `delete * from ${enname_one} where twoId='${twoId}'`
  async function sqlAllHandle() {
    await sqlHandle(deleteTwo);
    await sqlHandle(deleteArticle);
    return {
      code: "2051",
      msg: "获取数据成功",
    }
  }
  sqlAllHandle().then((data) => {
    res.send(data)
  }).catch((err) => {
    res.send({
      code: "2052",
      msg: "获取数据失败"
    })
  })
}
module.exports = router;