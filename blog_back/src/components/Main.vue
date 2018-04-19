<template>
	<div class="mainBox">
		<Header/>
		<main>
			<Aside/>
			<router-view/>
		</main>
	</div>
</template>

<script>
import Header from './MainHeader';
import Aside from './MainAside';
export default {
	data() {
		return {

		}
	},
	components: {
		Header,
		Aside
	}
}
</script>

<style scoped>
	.mainBox {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		background: #409eff;
	}
	main {
		flex: 1;
		background: #fff;
		display: flex;
	}
</style>