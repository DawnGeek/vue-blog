<template>
    <div class="article_list">
        <el-table
            :data="formData"
            style="width: 800px">
            <el-table-column
                label="标题"
                width="180">
                <template scope="scope">
                    <span>{{ scope.row.article_name }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="作者"
                width="180">
                <template scope="scope">
                    <span>{{ scope.row.editer }}</span>
                </template>
            </el-table-column>
            <el-table-column
                label="时间"
                width="180">
                <template scope="scope">
                    <span>{{ scope.row.time }}</span>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="nowPage"
            :page-sizes="[2, 5, 10, 15]"
            :page-size="everyrows"
            layout="total, sizes, prev, pager, next, jumper"
            :total="this.olddata.length">
        </el-pagination>
        <el-dialog
            title="提示"
            :visible.sync="dialogVisible"
            size="tiny"
            :before-close="handleClose">
            <span>确定删除吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleOk">确定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                olddata: [],
                formData: [
                    {
                        article_name: "sss",
                        editer: "sss",
                        time: "123"
                    }
                ],
                nowPage: 1,
                everyrows: 5,
                dialogVisible: false,
                id: ""
            };
        },
        created() {
            this.getInitData()
        },
        methods: {
            getInitData() {
                this.axios.get("/api/back/article/getArticleList").then((data) => {
                    if(data.data.code == '3021') {
                        this.olddata = data.data.data
                        this.formData = this.olddata.slice(0, this.everyrows)
                    }
                })
            },
            dbclick(row) {
                this.$router.push({name: "api_list_detail", params: {data: row}})
            },
            handleEdit(index, row) {
                this.$router.push({path: "/back/amend_article", params: {id: row.id}})
            },
            handleDelete(index, row) {
                this.dialogVisible = true
                this.id = row.id
                this.enname_one = row.enname_one
                this.twoId = row.twoId
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
                this.everyrows = val
                this.formData = this.olddata.slice((this.nowPage - 1) * this.everyrows, this.everyrows * this.nowPage)
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
                this.nowPage = val
                this.formData = this.olddata.slice((val - 1) * this.everyrows, this.everyrows * val)
            },
            handleOk() {
                this.axios.post("/api/back/article/deleteArticle", {id: this.oneId, enname_one: this.one_enname}).then((data) => {
                    if(data.data.code == "3041") {
                        this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: 'success'
                        })
                    } else {
                        this.$message({
                            showClose: true,
                            message: "删除失败",
                            type: 'error'
                        })
                    }
                })
            },
            handleClose(done) {
                this.$confirm("确认关闭吗？")
                .then(_ => {
                    done()
                })
                .catch(_ => {})
            }
        }
    };
</script>

<style scoped>
    .el-pagination{
        margin: 50px 100px;
    }
</style>