<template>
	<div class="box">
		<b>加载中。。。。</b>
	</div>
</template>

<script>

import { 
	mapActions, 
	mapState 
} from 'vuex'

import axios from '../tool/axios'

export default {
	data() {
		return {

		}
	},
	created() {
		axios.get('/api/front/article/getNav').then(data => {

			//来到load组件向后台获取数据，
			this.SET_DATA(data.data.data)
			const to = this.$route.params.msg;
			this.$router.push(to)
		})
	},
	methods: {
		...mapActions([
			"SET_DATA"
		])
	}
}
</script>

<style scoped>
	.box {
		width: 100%;
		height: 100%;
		background: #fff;
		text-align: center;
		padding-top: 300px;
	}
</style>