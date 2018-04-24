<template>
    <div>
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="100px" class="demo-ruleForm">
            <h3>一级列表</h3>
            <el-form-item label="活动区域">
                <el-select v-model="form.region" placeholder="请选择活动区域">
                    <el-option v-for="item in form.type" :value='item.id' :label="item.cnname"></el-option>
                </el-select>
            </el-form-item>
            <h3>一级列表</h3>
            <el-form-item label="密码" prop="pass">
                <el-input type="index" v-model="ruleForm2.enname_two" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="index" v-model="ruleForm2.cnname_two" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
                <el-button @click="resetForm('ruleForm2')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
    data() {
        var checkAge = (rule, value, callback) => {
            if (!value) {
                return callback(new Error('年龄不能为空'));
            }
            setTimeout(() => {
                if (!Number.isInteger(value)) {
                    callback(new Error('请输入数字值'));
                } else {
                    if (value < 18) {
                        callback(new Error('必须年满18岁'));
                    } else {
                        callback();
                    }
                }
            }, 1000);
        };
        var validatePass = (rule, value, callback) => {
            if (value === '') {
                callback(new Error('不能为空'));
            } else {
                if (this.ruleForm2.checkPass !== '') {
                    this.$refs.ruleForm2.validateField('checkPass');
                }
                callback();
            }
        };
        var validatePass2 = (rule, value, callback) => {
            let reg = /^[^\u4e00-\u9fa5]+$/
            if (value === '') {
                callback(new Error('不能为空'));
            } else if (!reg.test(value)) {

                callback(new Error('不能为中文'));
            } else {
                callback();
            }
        };

        return {
            form:{
                type:null
            },
            ruleForm2: {
                oneId: '',
                enname_two: '',
                cnname_two: ''
            },
            rules2: {
                oneId: [
                    { validator: validatePass, trigger: 'blur' }
                ],
                enname_two: [
                    { validator: validatePass2, trigger: 'blur' }
                ],
                cnname_two: [
                    { validator: checkAge, trigger: 'blur' }
                ]
            }
        };
    },
     mounted() {
        this.axios.get("/api/back/class/getOneClass").then((data) => {
            let datas = data.data.data
            this.form.type = datas
        })
    },
    methods: {
        submitForm(formName) {
            this.ruleForm2.oneId = this.form.region
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.axios.post("/api/back/class/insertTwoClass", this.ruleForm2).then((data) => {               
                        if (data.data.code == "2011") { 
                            this.$message({
                                type: "success",
                                message: data.data.msg
                            })
                        }
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        }
    }
}

</script>
