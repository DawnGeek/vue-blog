<template>
    <div>
        <el-table
            :data="tableData"
            style="width: 750px">
            <el-table-column type="expand">
                <template scope="props">
                    <el-table
                        :data="props.row.twoClass"
                        style="width: 100%"
                        :row-class-name="tableRowClassName">
                        <el-table-column prop="cnname" label="中文标识" width="180px"></el-table-column>
                        <el-table-column prop="enname" label="英文标识" width="180px"></el-table-column>
                        <el-table-column label="操作">
                            <template scope="scope">
                                <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                                <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </template>
            </el-table-column>
            <el-table-column label="中文名称" prop="oneClass.cnname"></el-table-column>
            <el-table-column label="英文名称" prop="oneClass.enname"></el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row, 'one')">编辑</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row, 'one')">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
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
            tableData: [],
            dialogVisible: false,
            state: "",
            oneId: "",
            one_enname: "",
            twoId: ""
        };
    },
    methods: {
        tableRowClassName(row, index) {
            if(index === 1) {
                return 'info-row'
            } else if(index === 3) {
                return 'positive-row'
            }
            return '';
        },
        handleEdit(index, data, state) {
            if(state == "one") {
                this.$router.push({path: "/back/amend_one_class"})
                sessionStorage.setItem("oneClassData", JSON.stringify(data.oneClass))
            } else {
                this.$router.push({path: "/back/amend_two_class"})
                sessionStorage.setItem("twoClassData", JSON.stringify(data))
            }
        },
        handleDelete(index, data, state) {
            this.dialogVisible = true
            this.state = state
            if(state == "one") {//删除一级
                this.oneId = data.oneClass.id
                this.one_enname = data.oneClass.enname
            } else {
                var oneenname = null
                // console.log(this.tableData)
                this.tableData.map((i) => {
                    if(i.oneClass.id == data.parent_id) {
                        oneenname = i.oneClass.enname
                    }
                }, this)
                this.twoId = data.id
                this.one_enname = oneenname
                this.oneId = data.parent_id
            }
        },
        handleOk() {
            if(this.state == 'one') {
                this.axios.post("/api/back/class/deleteClassOne", {id: this.oneId, enname_one: this.one_enname}).then((data) => {
                    if(data.data.code == "2041") {
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
            } else {
                this.axios.post("/api/back/class/deleteClassTwo", {oneId: this.oneId, twoId: this.twoId, enname_one: this.one_enname}).then((data) => {
                    if(data.data.code == "2051") {
                        this.$message({
                            showClose: true,
                            message: "删除成功",
                            type: 'success'
                        })
                        this.$router.go(0)
                    } else {
                        this.$message({
                            showClose: true,
                            message: "删除失败",
                            type: 'error'
                        })
                    }
                })
            }
            this.dialogVisible = false
        },
        handleClose(done) {
            this.$confirm("确认关闭吗？")
            .then(_ => {
                done()
            })
            .catch(_ => {})
        },
        initData(data) {
            return data.oneData.map((i) => {
                let obj = {
                    oneClass: i,
                    twoClass: []
                }
                data.twoData.forEach((j) => {
                    if(j.parent_id == i.id) {
                        obj.twoClass.push(j)
                    }
                })
                return obj
            })
        }
    },
    created() {
        this.axios.get("/api/back/class/Class").then((data) => {
            this.tableData = this.initData(data.data.data)
        })
    }
};
</script>

<style scoped>

</style>