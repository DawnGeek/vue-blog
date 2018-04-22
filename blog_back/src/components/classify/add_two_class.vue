<template>
    <div class="two">
        <el-form :model="ruleForm2" status-icon :rules="rules2" ref="ruleForm2" label-width="130px" class="demo-ruleForm">
            <h1>一级分类列表</h1>
            <el-form-item label="一级中文类名" prop="cnname_two">
                <el-select v-model="ruleForm2.oneId" placeholder="请选择分类">
                    <el-option v-for="item in options" :key="item.id" :label="item.cnname" :value="item.id"></el-option>
                </el-select>
            </el-form-item>
            <h1>二级分类列表</h1>
            <el-form-item label="二级中文类名" prop="cnname_two"  :rules="{required: true, message: '不能为空'}">
                <el-input type="text" v-model="ruleForm2.cnname_two" auto-complete="off"></el-input>
            </el-form-item>
            <el-form-item label="二级英文标识" prop="enname_two">
                <el-input type="text" v-model="ruleForm2.enname_two" auto-complete="off"></el-input>
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
        name: "addTwoClass",
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
                ruleForm2: {
                    oneId: "",
                    cnname_two: "",
                    enname_two: ""
                },
                options: [],
                rules2: {
                    cnname_two: [{ trigger: "blur" }],
                    enname_two: [{ validator: validateEnname, trigger: "blur" }]
                }
            };
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        this.axios.post("/api/back/class/insertTwoClass",this.ruleForm2).then((data) => {
                            if(data.data.code == "2011") {
                                this.$message({
                                    showClose: true,
                                    message: "提交成功",
                                    type: 'success'
                                })
                            } else {
                                this.$message({
                                    showClose: true,
                                    message: "提交失败",
                                    type: 'error'
                                })
                            }
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName) {
                this.$refs[formName].resetFields();
            }
        },
        created() {
            this.axios.get("/api/back/class/getOneClass").then((data) => {
                this.options = data.data.data
            })
        }
    };
</script>

<style scoped>
    .two{
        height: 100%;
    }
    h1{
        margin-top: 45px;
        margin-bottom: 25px;
        font-size: 22px;
    }
    .el-form{
        margin-left: 30px;
    }
</style>