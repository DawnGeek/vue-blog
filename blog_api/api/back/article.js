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
    content,
    data,
    twoId,
  } = req.body;

  // 添加语句
  let addSql = "INSERT INTO `blog`.`article` SET `id` = '"+Unique()+"', `author` = '" + author + "', `name` = '" + name + "', `onename` = '" + onename + "', `twoname` = '" + twoname + "', `takeaway` = '" + takeaway + "', `content` = '" + content + "', `disradio` = '" + disradio + "', `recradio` = '" + recradio + "', `data` = '" + data + "'";
  //let newSql = "INSERT INTO `awaw`.`article` SET `id` = '"+Unique()+"', `author` = '" + author + "', `name` = '" + name + "', `onename` = '" + onename + "', `twoname` = '" + twoname + "', `takeaway` = '" + takeaway + "', `content` = '" + content + "', `disradio` = '" + disradio + "', `recradio` = '" + recradio + "', `data` = '" + data + "'";
  // 二级列表文章数量+1
  var updateArticalNum = `update two_list set article_num = article_num + 1 where id='${req.body.twoId}'`
  
  async function sqlAllHandle() {
    await sqlHandle(addSql);
    await sqlHandle(updateArticalNum);
    return {
      code: "2011",
      msg: "文章添加成功！"
    }
  }
  sqlAllHandle().then((data) => {
      res.send(data)
    }).catch((err) => {
      res.send({
        code: "2012",
        msg: "文章添加失败！"
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


// 修改文章
router.post('/updateArticle', (req, res, next) => {
    var sql = `update ${req.body.enname_one} set article_name = '${req.body.article_name}', editer = '${req.body.editer}', content = '${req.body.content}', time = '${req.body.time}', visitors = '${req.body.visitors}', daodu = '${req.body.daodu}', recommend = '${req.body.recommend}', art_show = '${req.body.art_show}' where id = '${req.body.id}'`

    sqlHandle(sql).then((data) => {
        res.end({
            code: "3031",
            msg: "修改成功"
        })
    }).catch((err) => {
        res.send({
            code: "3032",
            msg: "修改失败"
        })
    })
})

// 获取所有的文章列表
router.get("/getArticleList", (req, res, next) => {

    var sqlone = `select * from onelist`
    var aqltwo = `select * from twolist`
    // 拼接查询文章的sql
    const connectSql = (oneClass) => {
        var selectArtSql = `select * from (`
        oneClass.forEach(function(i, index) {
            if (index < (oneClass.length - 1)) {
                selectArtSql += `select * from ${i.enname} UNION ALL`
            } else {
                selectArtSql += `select * from ${i.enname})as tabel_all order by time desc`
            }
        }, this)
        return selectArtSql
    }
    // 把一二级类名添加到文章列表
    const connectArticle = (data) => {
        const { articleData, oneClass, twoClass } = data
        return articleData.map(function (i) {
            oneClass.forEach(function (j) {
                if(j.id == i.oneId) {
                    i.enname_one = j.enname
                    i.cnname_one = j.cnname
                }
            })
            twoClass.forEach(function (j) {
                if(j.id == i.twoId) {
                    i.enname_two = j.enname
                    i.cnname_two = j.cnname
                }
            })
            return i
        })
    }

    const asyncGetArticle = async function () {
        let oneClass = await readHandle(sqlone)
        let twoClass = await readHandle(sqltwo)

        let articleData = await readHandle(connectSql(oneClass))
        return connectArtcle({ articleData, oneClass, twoClass })
    }
    asyncGetArticle().then((data) => {
        res.send({
            code: "3021",
            msg: "获取成功",
            data
        })
    }).catch((err) => {
        res.send({
            code: "3022",
            msg: "获取失败"
        })
    })
})

module.exports = router;