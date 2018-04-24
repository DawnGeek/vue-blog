<template>
    <div class='text1'>
        <div class='addart'>
            <h3>增加文章</h3>
            <el-form ref="form" :model="form" label-width="100px" :rules="rules">
                <el-form-item label="标题" required prop="name" :rules="{required: true, message: '不能为空'}">
                    <el-input v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="接口地址" required prop="url" :rules="{required: true, message: '不能为空'}">
                    <el-input v-model="form.url"></el-input>
                </el-form-item>
                <el-form-item label="类型" required prop="region" :rules="{required: true, message: '不能为空'}">
                    <el-select v-model="form.region" placeholder="请选择活动区域">
                        <el-option label="前台接口" value="font"></el-option>
                        <el-option label="后台接口" value="back"></el-option>
                    </el-select>
                </el-form-item>

                <el-form-item label="请求类型" required prop="type" :rules="{required: true, message: '不能为空'}">
                    <el-select v-model="form.type" placeholder="请选择活动区域">
                        <el-option label="get" value="get"></el-option>
                        <el-option label="post" value="post"></el-option>
                        <el-option label="formdata" value="formdata"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="请求参数" required prop="author" :rules="{required: true, message: '不能为空'}">
                    <el-input type="textarea" v-model="form.author"></el-input>
                </el-form-item>
                <el-form-item label="响应数据" required prop="desc" :rules="{required: true, message: '不能为空'}">
                    <el-input type="textarea" v-model="form.desc"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit('form')">提交</el-button>
                    <el-button>取消</el-button>
                </el-form-item>
            </el-form>

        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            form: {
                cnname_one: null,
                onename: null,
                region: '',
                type: '',
                url: '',//接口地址
                desc: '',//响应数据
                resources: '',
                author: "",//请求参数
            },
            rules: {
                cnname_one: [{ trigger: "input" }],
                enname_one: [{ trigger: "blur" }],
                cnname_two: [{ trigger: "input" }],
                enname_two: [{ trigger: "blur" }]
            }
        }
    },

    methods: {
        onSubmit(form) {
            //value值不能为空
            if (this.form.name && this.form.url && this.form.type && this.form.type && this.form.author && this.form.desc) {
                this.axios.post("/api/back/interface/interfaceAdd", {
                    title: this.form.name,
                    url: this.form.url,
                    type: this.form.type,//post get
                    sendparams: this.form.author,//请求参数
                    getparams: this.form.desc,//响应数据
                    backorfont: this.form.region//前台后端

                }).then(data => {
                    if (data.data.code == "4011") {
                        this.$message({
                            type: "success",
                            message: data.data.msg
                        })
                    }
                })
            }
            //console.log(this.form.region);

        }

    },
    mounted() {
    }

}
</script>
<style scoped>
.text1 {
    width: 50%;
    heigth: 100%;
    font-size: 15px;
}

.addart {
    width: 100%;
    margin-top: 20px;
    position: relative;
}

div {
    font-size: 15px;
}
</style>