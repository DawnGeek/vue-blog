<!-- <template>
	<div class="body">
		<ul>
			<li>
				<h1>一级分类列表</h1>
				<el-row>
				  <el-col :span="8">
				      <el-input>
				          <template slot="prepend">一级中文类名</template>
				      </el-input>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="8">
				      <el-input>
				          <template slot="prepend">一级英文类名</template>
				      </el-input>
				  </el-col>
				</el-row>
			</li>
			<li>
			<h1>二级分类列表</h1>	
				<el-row>
				  <el-col :span="8">
				      <el-input>
				          <template slot="prepend">二级中文类名</template>
				      </el-input>
				  </el-col>
				</el-row>
				<el-row>
				  <el-col :span="8">
				      <el-input>
				          <template slot="prepend">二级英文类名</template>
				      </el-input>
				  </el-col>
				</el-row>
			</li>
			<li>
				<el-row>
				  <el-col :span="8" class="btnBox">
				      <el-button type="success" icon="el-icon-check" circle></el-button>
				      <el-button type="danger" icon="el-icon-delete" circle></el-button>
				  </el-col>
				</el-row>
			</li>
		</ul>
	</div>
</template>

<script>
export default {
	data() {
		return {

		}
	}
}
</script>
-->

<template>
	<div class="body">
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
 			<el-form-item label="一级中文类名" prop="cnonename">
    		<el-input v-model="ruleForm.cnonename" ref="cnonename"></el-input>
  		</el-form-item>
  		<el-form-item label="一级英文文类名" prop="enonename">
    		<el-input v-model="ruleForm.enonename" ref="enonename"></el-input>
  		</el-form-item>
  		<el-form-item label="二级中文类名" prop="cntwoname">
    		<el-input v-model="ruleForm.cntwoname" ref="cntwoname"></el-input>
  		</el-form-item>
  		<el-form-item label="二级英文文类名" prop="entwoname">
    		<el-input v-model="ruleForm.entwoname" ref="entwoname"></el-input>
  		</el-form-item>
  	<el-form-item>
    		<el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
    		<el-button @click="resetForm('ruleForm')">重置</el-button>
  		</el-form-item>
		</el-form>
	</div>
</template>
<script>
  export default {
    data() {
      return {
        ruleForm: {
          cnonename: '',
          enonename: '',
          cntwoname: '',
          entwoname: ''
        },
        rules: {
          cnonename: [
            { required: true, message: '请输入一级分类', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          enonename: [
            { required: true, message: '请输入合理的英文', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          cntwoname: [
            { required: true, message: '请输入一级分类', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          entwoname: [
            { required: true, message: '请输入合理的英文', trigger: 'blur' },
            { min: 3, max: 20, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.axios.post('/api/back/class/insertoneclass', {
            	enname_one: this.$refs.cnonename.value,
          		cnname_one: this.$refs.enonename.value,
          		enname_two: this.$refs.cntwoname.value,
          		cnname_two: this.$refs.entwoname.value
            }).then(data => {
            	console.log(data)
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
    }
  }
</script>
<style scoped>
	.body {
		width: 100%;
		height: 100%;
		padding-left: 20px;
	}
	li {
		margin-top: 20px;
	}

	h1 {
		margin: 14px 0;
		font-size: 24px;
	}
	.el-col {
		margin-bottom: 10px;
		width: 500px;
	}
	.li:nth-child(2) {
		margin-top: 0;
	}
	.el-input__inner {
		width: 300px;
	}

	.btnBox {
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>