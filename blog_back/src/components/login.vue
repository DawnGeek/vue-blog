<template>
	<div class="loginBox">
		<LoginHeader/>
		<LoginMark/>
	</div>
</template>

<script>
import LoginHeader from './LoginHeader'
import LoginMark from './LoginMark'
	export default{
		data() {
			return {

			}
		},
		components: {
			LoginHeader,
			LoginMark
		}
  }

</script>

<style>
	.loginBox {
		position: relative;
		width: 100%;
		height: 100%;
		background: url('https://pan.baidu.com/static/images/16new/bg2.jpg') no-repeat;
		background-position: center center;
		background-size: auto 100%;
	}

</style>