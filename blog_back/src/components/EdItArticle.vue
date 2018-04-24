<template>
<div class="body">
  <h1>修改文章</h1>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
    <el-form-item label="文章标题" prop="name">
      <el-input v-model="ruleForm.name" />
    </el-form-item>
    <el-form-item label="一级类名">
      <el-select v-model="ruleForm.onename" placeholder="请选择" @change="getTwo">
        <el-option v-for="item in cnonenameArr" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="二级类名">
      <el-select v-model="ruleForm.twoname" placeholder="请选择">
        <el-option v-for="item in cntwonameArr" :label="item" :value="item" />
      </el-select>
    </el-form-item>
    <el-form-item label="是否显示">
      <el-radio v-model="ruleForm.disradio" label="1">是</el-radio>
      <el-radio v-model="ruleForm.disradio" label="2">否</el-radio>
    </el-form-item>
    <el-form-item label="是否推荐">
      <el-radio v-model="ruleForm.recradio" label="1">是</el-radio>
      <el-radio v-model="ruleForm.recradio" label="2">否</el-radio>
    </el-form-item>
    <el-form-item label="作者" prop="author">
      <el-input v-model="ruleForm.author" />
    </el-form-item>
    <el-form-item label="导读">
      <el-input v-model="ruleForm.takeaway" />
    </el-form-item>
    <el-form-item label="活动时间" required width="100">
      <el-form-item prop="date">
        <el-date-picker type="date" placeholder="选择日期" v-model="ruleForm.date" />
      </el-form-item>
    </el-form-item>
    <el-row>
      <div id="editor"></div> 
    </el-row>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</div>
</template>

<script>
export default {
  data() {
    return {
      oneData: [],
      cnonenameArr: [],
			cntwonameArr: [],
      Id: '',
      ruleForm: {
        name: '',
        onename: '',
        twoname: '',
        disradio: '1',
        recradio: '1',
        takeaway: '',
        author: '',
        date: '',
        content: '',
        foundId: ''
      },
      rules: {
        name: [{
          required: true,
          message: '请输入文章标题',
          trigger: 'blur'
        }],
        onename: [{
          required: true,
          message: '选择',
          trigger: 'change'
        }],
        twoname: [{
          required: true,
          message: '选择',
          trigger: 'change'
        }],
        author: [{
          required: true,
          message: '请输入作者名字',
          trigger: 'blur'
        }],
        date: [{
          type: 'date',
          required: true,
          message: '请选择日期',
          trigger: 'change'
        }],
        content: [{
          required: true,
          message: '请填写内容',
          trigger: 'blur'
        }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.axios.post("/api/back/article/updateArticle", {
            name: this.ruleForm.name,
            onename: this.ruleForm.onename,
            twoname: this.ruleForm.twoname,
            disradio: this.ruleForm.disradio,
            recradio: this.ruleForm.recradio,
            takeaway: this.ruleForm.takeaway,
            author: this.ruleForm.author,
            date: this.ruleForm.date.toString(),
            content: this.editor.getContent()
          }).then(data => {
            switch(data.data.code) {
                case '3031':
                this.$message({
                  message: data.data.msg,
                  type: 'success'
                })
                break;
                default: 
                this.$message.error(data.data.msg)
              }
          })
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    getClass() {
			this.axios.get('/api/back/class/getoneclass').then(data => {
				data.data.data.forEach((item, idx) => {
					this.cnonenameArr.push(item.cnname)
				});
        this.oneData = data.data.data
			})
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    getTwo() {
      this.id = '';
      for (var index in this.oneData) {
        if(this.ruleForm.onename == this.oneData[index].cnname) {
          this.id = this.oneData[index].id;
        }
      }
      this.cntwonameArr = [];
      this.axios.post('/api/back/class/gettwoclass', {
        parentId: this.id
      }).then(data => {
        data.data.data.forEach((item, idx) => {
          this.cntwonameArr.push(item.enname)
        })
      })
    }

  },
	mounted() {
		this.getClass();
    this.editor = UE.getEditor('editor');
    this.foundId = this.$route.params.id
	},
  destroyed() {
      this.editor.destroy();
  }

}
</script>
<style scoped>
.body {
  flex: 1;
  padding: 10px;
  overflow-y: scroll;
}

h1 {
  font-size: 30px;
  margin: 20px 0;
}
</style>
