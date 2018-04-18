<template>
	<div class="loginBox">
		<LoginHeader/>
	</div>
</template>

<script>
import LoginHeader from './LoginHeader'
	export default{
		data() {
			return {

			}
		},
		components: {
			LoginHeader
		}
  }

</script>

<style>
	.loginBox {
		width: 100%;
		height: 100%;
		background: url('https://pan.baidu.com/static/images/16new/bg2.jpg') no-repeat;
		background-position: center center;
		background-size: auto 100%;
	}

</style>