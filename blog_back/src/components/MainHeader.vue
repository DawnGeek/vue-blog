<template>
	<div class="mainHeader">
		<b>后台管理系统</b>
		<b>{{name}}</b>
	</div>
</template>

<script>
export default{
	data() {
		return {
			name: sessionStorage.getItem("userName")
		}
	},
	mounted() {
		console.log(sessionStorage.getItem("userName"))
	}
}
</script>

<style>
	.mainHeader {
		width: 100%;
		height: 50px;
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 0 10px;

	}
	b {
		font-size: 18px;
		color: #fff;
	}

</style>