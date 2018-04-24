var express = require('express');
var router = express.Router();
var hasOwnProperty=require('has-own-property-x');  //支持hasOwnProperty
var Unique=require("../common/Unique")
var CreatTime=require("../common/creatTime")
var {
  sqlHandle,  //修改和增加操作
  readHandle,  //读取操作
  searchHandle,  //检测有无某条数据，有为false
  searchHandleNormal,  //检测有无某条数据，有为true
  query             // //基本操作
}=require("../../config/db_connect")

//增加接口文档
router.post("/interfaceAdd",(req,res,next)=>{
  let {title,url,type,sendparams,getparams,backorfont}=req.body
    if(title&&url&&type&&sendparams&&getparams&&backorfont){
      var insertTwo=`insert into apilist(id,title,url,type,sendparams,getparams,backorfont,time) values('${Unique()}','${title}','${url}','${type}','${sendparams}','${getparams}','${backorfont}','${CreatTime()}')`
      console.log(insertTwo)
       // 检测二级分类是否存在
      // let testTwoClass=`select * from apilist where title='${title}' OR type='${type}'`
      async function sqlAllHandle() {
        // await searchHandle(testTwoClass)
          await sqlHandle(insertTwo);
          return {
            code:"4011",
            msg:"插入成功"
          }
       }
       sqlAllHandle().then((data)=>{
          res.send(data)
       }).catch((err)=>{
          res.send({
            code:"4012",
            msg:"插入失败"
          })
       })
    }
})



module.exports = router