<template>
	<div class="loginMark">
		<h1>个人博客</h1>
		<div class="login-box">
			<el-row>
			  <el-col :span="8">
			      <el-input id="name" placeholder="请输入帐号" v-model.lazy="username.value" v-focus="username">
			          <template slot="prepend">帐号</template>
			      </el-input> 
			  </el-col>
			</el-row>
		<el-row>
		  <el-col :span="8">
		      <el-input id="password" type="password" v-model.lazy="password.value" placeholder="请输入密码" v-focus="password">
		          <template slot="prepend">密码</template>
		      </el-input>
		  </el-col>
		</el-row>
		<el-row>
		  <el-col :span="8">
		      <el-button id="login" style="width:100%" type="primary" @click="submit">登录</el-button>
		  </el-col>
		</el-row>
		</div>
	</div>
</template>

<script>
import LoginHeader from './LoginHeader'
	export default{
		data() {
			return {
				username: {
					value: '',
					reg:/^[a-zA-Z]{4,12}$/,
					msg: '您输入的用户名有误！'
				},
				password: {
					value:'',
					reg:/^[a-zA-Z0-9]{6,12}$/,
					msg: '您输入的密码有误！'
				}
			}
		},
		methods: {
			submit() {
    		if(this.username.value && this.password.value) {
       		this.axios.post("/api/back/user/login", {
       			username: this.username.value,
       			password: this.password.value
       		}).then(data => {
       			console.log(data.data.code)
       			switch(data.data.code) {
       				case '1002':
       					this.$message({
			          	message: data.data.msg,
			          	type: 'success'
			       		});
			       		sessionStorage.setItem("userId",data.data.id);
						sessionStorage.setItem("userName",data.data.name);
			       		this.$router.push('/main/addone');
       				break;
       				case '1000':
       					this.$message({
			          	message: data.data.msg,
			          	type: 'warning'
			       		});
       				break;
       				case '1001':
       					this.$message({
			          	message: data.data.msg,
			          	type: 'warning'
			       		});
       				break;
       				case '1003':
       					this.$message({
			          	message: data.data.msg,
			          	type: 'warning'
			       		});
       				break;
       			}
       			
       		})
    		} else {
	  			this.$message({
	        	message: '用户名或密码尚未输入！',
	        	type: 'warning'
        	});
    		}
			}
		},
		components: {

		}
  }

</script>

<style>
	.loginMark {
		position: absolute;
		top: 50%;
		right: 0px;
		width: 350px;
		height: 450px;
		background-color: hsla(0,0%,100%,.7);
		transform: translate(-20%,-50%);
		padding: 10px;
	}

	h1 {
		width: 100%;
		text-align: center;
		margin: 30px 0;
		font-size: 20px;
	}
	.el-row {
		position: relative;
 		margin-bottom: 25px;
 	}
 	.el-row:last-child {
  		margin-top: 20px;
 	}
  .el-col {
  	width: 100%;
  }
  .oP {
  	position: absolute;
  	bottom: -20px;
  	left: 80px;
  	color: red;
  }
</style>