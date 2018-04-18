var express = require('express');
var router = express.Router();
var hasOwnProperty = require('has-own-property-x');
var {
  sqlHandle, //除查询外的其他操作
  readHandle, //读取操作
  searchHandle, //检测有无某条数据，有为false
  searchHandleNormal, //检测有无某条数据，有为true
  query //基本操作
} = require("../../config/db_connect");


/* GET home page. */

router.get('/', function(req, res, next) {
  var sql = `select * from user`;
  readHandle(sql).then((data) => {
    res.send({
      code: 200,
      data: data
    });
  })
});

router.post('/login', function(req, res, next) {
  let arg = req.body;
  if (hasOwnProperty(arg, 'username') && hasOwnProperty(arg, 'password')) {
    let {
      username,
      password
    } = arg;
    const userSql = `select * from user where username='${username}'`;
    readHandle(userSql).then(data => {
      console.log(data)
      if (data.length < 0) {
        res.send({
          code: '1001',
          msg: '未该用户名'
        });
      } else {
        if (data[0].password === password) {
          res.send({
            code: '1002',
            msg: '登陆成功！'
          });
        } else {
          res.send({
            code: '1003',
            msg: '该用户名的密码不正确'
          })
        }
      }
    })
  } else {
    res.send({
      code: '1000',
      msg: '未输入用户名或密码'
    })
  }
});


module.exports = router;