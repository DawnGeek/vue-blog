<template>
 <div>
  <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="150px" class="demo-ruleForm">
  <h3>一级分类列表</h3>
    <el-form-item label="一级中文类名" prop="cnname_one"  :rules="{required: true, message: '不能为空'}">
        <el-input type="text" v-model="ruleForm2.cnname_one" auto-complete="off"></el-input>
    </el-form-item>
    <el-form-item label="一级英文标识" prop="enname_one">
        <el-input type="text" v-model="ruleForm2.enname_one" auto-complete="off"></el-input>
    </el-form-item>
  <el-form-item>
    <el-button type="primary" @click="submitForm">提交</el-button>
    <el-button @click="resetForm('ruleForm2')">重置</el-button>
  </el-form-item>
</el-form>
</div>

</template>
<script>
  export default {
    data() {
      var validateEnname = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("不能为空"));
        } else if (!/^[a-zA-Z]{2,16}/.test(value)) {
            callback(new Error("您输入的格式不正确"));
        }else {
            callback();//执行下一个
        }
    };
      return {
        ruleForm2: {
          pass: '',
          checkPass: '',
          region: '',
          oneDate:null,
          cnname_one: "",
          enname_one: ""
        },
        rules2: {
           cnname_one: [{ trigger: "input" }],
           enname_one: [{ validator: validateEnname, trigger: "blur" }]
        }
      };
    },
    methods:{
      submitForm() {
        this.axios.post('/api/back/class/amendClassOne',{
            oldenname_one:this.ruleForm2.cnname_one,
            enname_one:this.ruleForm2.enname_one,
            cnname_one:this.ruleForm2.cnname_one
        }).then(data=>{
            if(data.data.code == "2061") {
                this.$message({
                    showClose: true,
                    message: data.data.msg,
                    type: 'success'
                })
            } else {
                this.$message({
                    showClose: true,
                    message: data.data.msg,
                    type: 'error'
                })
            }
            console.log(data);
        })

      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    mounted() {
      this.ruleForm2.cnname_one = sessionStorage.getItem("cnnameOne");
      this.ruleForm2.enname_one = sessionStorage.getItem("ennameOne");
      console.log(this.ennameOne);
    }
  }
</script>
<style scoped>

</style>