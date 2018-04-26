<template>
	<div class="main">
		<TopBar/>
		<Blog/>
	</div>
</template>

<script>
import TopBar from './TopBar.vue'
import Blog from './Blog.vue'
import axios from '../tool/axios'

import {
	mapActions, 
	mapState 
} from 'vuex';

export default {
	data() {
		return {

		}
	},
	beforeRouteEnter(to, from, next){

		next(vm => {
			const back = vm.$route.path;
			到load组件
			vm.$router.push({
				name: 'load',
				params: {
					back
				}
			})
		})
	},
	methods: {
	},
	components: {
		TopBar,
		Blog
	},
	mounted() {
		
	}
}
</script>

<style scoped>
	.main {
		width: 100%;
		height: 100%;
		background: #f5f5f5;
		display: flex;
		flex-direction: column;
		overflow-y: scroll;
	}
</style>