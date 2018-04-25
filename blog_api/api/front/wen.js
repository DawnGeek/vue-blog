var express = require('express');
var router = express.Router();
var hasOwnProperty=require('has-own-property-x');  //支持hasOwnProperty
var Unique=require("../common/Unique")
var CreatTime=require("../common/creatTime")
const moment = require("moment");//数据库时间转js时间格式 


var {
  sqlHandle,  //修改和增加操作
  readHandle,  //读取操作
  searchHandle,  //检测有无某条数据，有为false
  searchHandleNormal,  //检测有无某条数据，有为true
  query             // //基本操作
}=require("../../config/db_connect")

//获取分类的列表
router.get('/ArticleClass',(req,res,next)=>{
   var getOneClass = `select * from one_class`;
   var getTwoClass=`select * from two_class`;
   async function sqlAllHandle() {
      let oneData=await readHandle(getOneClass);
      let twoData=await readHandle(getTwoClass);
      let data={oneData,twoData}
      return {
        code:"5011",
        msg:"获取数据成功",
        data
      }
    }
    sqlAllHandle().then((data)=>{
        res.send(data)
      }).catch((err)=>{
        res.send({
          code:"5012",
          msg:"获取数据失败"
        })
      })
})

//获取一级二级的列表
router.post('/insterText',(req,res,next)=>{
  let {twoname,disradio}=req.body;//二级的名字 是否显示
  if(twoname&&disradio){
   var getClass = `select * from wenzhang where twoname = '${twoname}' and disradio = '${disradio}'`;
   console.log(getClass)
   async function sqlAllHandle() {
      let oneData=await readHandle(getClass);
      return {
        code:"5021",
        msg:"获取数据成功"
      }
    }
    sqlAllHandle().then((data)=>{
        res.send(data)
      }).catch((err)=>{
        res.send({
          code:"5022",
          msg:"获取数据失败"
        })
      })
  }

})



module.exports = router