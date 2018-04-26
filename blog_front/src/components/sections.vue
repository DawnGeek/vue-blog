<template>
    <div class="section">
        <el-breadcrumb class="show" separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        </el-breadcrumb>
        <div class="left">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column prop="title" label="标题" width="160"></el-table-column>
                <el-table-column prop="classify" label="分类" width="160"></el-table-column>
                <el-table-column prop="author" label="作者" width="160"></el-table-column>
                <el-table-column prop="time" label="发布时间" width="160"></el-table-column>
            </el-table>
        </div>
        
        <div class="right">
            <div class="searchs">
                <h4>全站搜索</h4>
                <div class="input">
                    <el-autocomplete
                        v-model="state"
                        :fetch-suggestions="querySearchAsync"
                        placeholder="请输入内容"
                        @select="handleSelect"
                    ></el-autocomplete>
                </div>
                <div class="button">
                    <el-button type="primary">搜索</el-button>
                </div>
            </div>
            <div class="rankings">
                <h4>点击排行</h4>
                <div class="">
                    <p>111</p>
                    <p>111</p>
                    <p>111</p>
                    <p>111</p>
                </div>
            </div>
            <div class="article">
                <h4>最新文章</h4>
                <div class="">
                    <p>111</p>
                    <p>111</p>
                    <p>111</p>
                    <p>111</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                restaurants: [],
                state: '',
                timeout:  null,
                tableData: [
                    {
                        id: 1,
                        title: '果冻',
                        classify: '零食',
                        author: '果果',
                        time: '2018-04-25',
                    },
                    {
                        id: 2,
                        title: '鸡腿',
                        classify: '八维',
                        author: '球球',
                        time: '2018-04-25',
                    },
                    {
                        id: 3,
                        title: '品牌',
                        classify: '八维',
                        author: '木木',
                        time: '2018-04-25',
                    },
                    {
                        id: 4,
                        title: '操场',
                        classify: '技术',
                        author: '点点',
                        time: '2018-04-25',
                    }
                ]
            }
        },
        methods: {
            loadAll() {
                return [];
            },
            querySearchAsync(queryString, cb) {
                var restaurants = this.restaurants;
                var results = queryString ? restaurants.filter(this.createStateFilter(queryString)) : restaurants;

                clearTimeout(this.timeout);
                this.timeout = setTimeout(() => {
                    cb(results);
                }, 3000 * Math.random());
            },
            createStateFilter(queryString) {
                return (state) => {
                return (state.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0);
                };
            },
            handleSelect(item) {
                console.log(item);
            }
        },
        mounted() {
            this.restaurants = this.loadAll();
        }
    }
</script>

<style scoped>
    .show{
        padding: 10px 15px;
    }
    .left{
        width: 65%;
        float: left;
    }
    .right{
        width: 33%;
        float: right;
        background: #fff;
    }
    .title-one{
        text-align: center;
    }
    .searchs{
        height: 100px;
        background: paleturquoise;
    }
    .searchs h4{
        width: 98%;
        height: 30px;
        margin: 5px auto;
        text-align: center;
        line-height: 30px;
        background: cadetblue;
        border-radius: 5px;
        color: #fff;
    }
    .searchs .input{
        float: left;
        margin: 5px;
    }
    .searchs .button{
        float: left;
        margin: 5px 20px;
    }
    .rankings{
        background: #fff;
        margin-top: 10px;
        background: paleturquoise;
    }
    .rankings h4{
        width: 98%;
        height: 30px;
        margin: 5px auto;
        text-align: center;
        line-height: 30px;
        background: cadetblue;
        border-radius: 5px;
        color: #fff;
    }
    .article{
        background: #fff;
        margin-top: 10px;
        background: paleturquoise;
    }
    .article h4{
        width: 98%;
        height: 30px;
        margin: 5px auto;
        text-align: center;
        line-height: 30px;
        background: cadetblue;
        border-radius: 5px;
        color: #fff;
    }
</style>