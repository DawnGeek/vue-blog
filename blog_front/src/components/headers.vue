<template>
    <div class="headers">
        <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
            <el-menu-item index="1"><h1>个人博客</h1></el-menu-item>
            <el-submenu index="2">
                <template slot="title">我的工作台</template>
                <el-menu-item index="2-1">one</el-menu-item>
                <el-menu-item index="2-2">two</el-menu-item>
                <el-menu-item index="2-3">three</el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">我的工作台</template>
                <el-menu-item index="3-1">one</el-menu-item>
                <el-menu-item index="3-2">two</el-menu-item>
                <el-menu-item index="3-3">three</el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                activeIndex: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        } 
    }
</script>

<style scoped>
    .headers{
        border-bottom: 1px solid #ccc;
    }
</style>