<template>
    <div class="one">
        <el-form :model="ruleForm" status-icon :rules="rules2" ref="ruleForm" label-width="130px" class="demo-ruleForm">
            <h1>一级分类列表</h1>
            <el-form-item label="一级中文类名" prop="cnname_one" :rules="{required: true, message: '不能为空'}">
                <el-input type="text" v-model="ruleForm.cnname_one" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="一级英文标识" prop="enname_one">
                <el-input type="text" v-model="ruleForm.enname_one" auto-complete="off"></el-input>
            </el-form-item>
            <h1>二级分类列表</h1>
            <el-form-item label="二级中文类名" prop="cnname_two"  :rules="{required: true, message: '不能为空'}">
                <el-input type="text" v-model="ruleForm.cnname_two" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="二级英文标识" prop="enname_two">
                <el-input type="text" v-model="ruleForm.enname_two" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
  name: "addOneClass",
  data() {
    var validateEnname = (rule, value, callback) => {
        if (value === "") {
            callback(new Error("不能为空"));
        } else if (!/^[a-zA-Z]{2,16}/.test(value)) {
            callback(new Error("您输入的格式不正确"));
        }else {
            callback();
        }
    };
    return {
        ruleForm: {
            cnname_one: "",
            enname_one: "",
            cnname_two: "",
            enname_two: ""
        },
        rules2: {
            cnname_one: [{ trigger: "blur" }],
            enname_one: [{ validator: validateEnname, trigger: "blur" }],
            cnname_two: [{ trigger: "blur" }],
            enname_two: [{ validator: validateEnname, trigger: "blur" }]
        }
    };
  },
  methods: {
    submitForm(formName) {
        this.$refs[formName].validate(valid => {
            if (valid) {
                this.axios.post("/api/back/class/insertOneClass",this.ruleForm).then((data) => {
                    if(data.data.code == "2001") {
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
                })
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    },
    resetForm(formName) {
        this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
.one {
  height: 100%;
}
h1 {
  margin-top: 45px;
  margin-bottom: 25px;
  font-size: 22px;
}
.el-form {
  margin-left: 30px;
}
</style>