<template>
  <div class="load">
    <ul id="box">
      <li>
				<h4 id="pleaselogin">{{msg}}:</h4>
			</li>
      <li>
        <input type="text" id="user" placeholder="请输入账号" v-model.lazy="username.value"  v-focus="username" @blur="change(username)">
      </li>
      <li>
      	<input type="password" id="psw" placeholder="请输入密码" v-model.lazy="password.value"  v-focus="password" @blur="change(password)">
      </li>
      <li>
				<el-button type="success" id="btn" @click="submit">登录</el-button>
			</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "login",
  data() {
    return {
      msg: "个人博客",
      username: {
        value: "",
        reg: /^[a-zA-Z]{4,12}$/,
        msg: "您输入的用户名格式不对",
        state: false
      },
      password: {
        value: "",
        reg: /^[a-zA-Z0-9]{6,12}$/,
        msg: "您输入的密码格式不对",
        request: true,
        state: false
      }
    };
  },
  methods: {
    change(data) {
      data.state = true;
    },
    submit() {
      if (this.username.value && this.password.value) {
        this.axios.post("/api/back/user/login", {
            username: this.username.value,
            password: this.password.value
          }).then(data => {
            switch (data.data.code) {
              case "1001":{
								this.$message({
									message: "恭喜你，登录成功",
									type: "success"
								});
								sessionStorage.setItem("userId", data.data.data.id);
								sessionStorage.setItem("userName", data.data.data.name);
								this.$router.push("/back/main");
							}
                break;
              default: {
                this.$message({
                  message: data.data.msg,
                  type: "error"
                });
              }
            }
          });
      } else {
        alert("填写");
      }
    }
  }
};
</script>

<style scoped>
	#box {
		width: 500px;
		height: 450px;
		border: 1px solid #ccc;
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		background: rgba(255, 255, 255, 0.8);
	}
	h4 {
		width: 100%;
		height: 50px;
		margin-left: 20px;
		line-height: 50px;
		font-size: 24px;
	}
	input {
		width: 80%;
		height: 40px;
		display: block;
		margin: 0 auto;
		border: none;
		box-sizing: border-box;
		padding: 0 10px;
		outline: none;
		border: 1px solid #ccc;
	}
	li {
		margin: 25px;
	}
	#btn {
		width: 80%;
		height: 40px;
		display: block;
		margin: 50px auto;
		background: orange;
		border: 0;
		outline: none;
		font-size: 14px;
		color: #fff;
	}
</style>