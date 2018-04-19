<template>
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