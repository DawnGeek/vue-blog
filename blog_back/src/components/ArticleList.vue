<template>
<el-table :data="tableData" style="width: 100%">
  <el-table-column label="标题" width="180">
    <template slot-scope="scope">
        <i class="el-icon-time"></i>
         <span style="margin-left: 10px">{{ scope.row.name }}</span>
      </template>
  </el-table-column>
  <el-table-column label="作者" width="180">
    <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.author }}</span>
      </template>
  </el-table-column>
  <el-table-column label="时间" width="180">
    <template slot-scope="scope">
        <span style="margin-left: 10px">{{ scope.row.data }}</span>
      </template>
  </el-table-column>
  <el-table-column label="操作">
    <template slot-scope="scope">
        <el-button
          size="mini"
          @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
        <el-button
          size="mini"
          type="danger"
          @click="handleDelete(scope.$index, scope.row)">删除</el-button>
      </template>
  </el-table-column>
</el-table>
</template>

<script>
export default {
  data() {
    return {
      tableData: []
    }
  },
  methods: {
    handleEdit(index, row) {
      console.log(index, row);
    },
    handleDelete(index, row) {
      console.log(index, row);
    }
  },
  created() {
        this.axios.get("/api/back/class/getArticle").then((data) => {
            this.tableData = this.initData(data.data.data)
        })
    }
}
</script>
