<template>
    <div id="app">
        <div>
            <el-container style="height: 900px;">
                <el-aside width="200px" style="background-color: #ffffff">
                    <el-menu :default-openeds="['/images','/containers']" :default-active="activeIndex"
                             @select="handleSelect">
                        <el-menu-item index="/index">
                            <template slot="title"><i class="el-icon-magic-stick"></i>
                                <span style="font-size: 18px">项目简介</span>
                            </template>
                        </el-menu-item>
                        <el-menu-item index="/hosts">
                            <template slot="title"><i class="el-icon-monitor"></i>
                                <span style="font-size: 18px">主机管理</span>
                            </template>
                        </el-menu-item>
                        <el-submenu index="3">
                            <template slot="title"><i class="el-icon-message"></i>
                                <span style="font-size: 18px">蜜罐管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="3-1">
                                    <span style="font-size: 18px">查看镜像</span>
                                </el-menu-item>
                                <el-menu-item index="3-2">
                                    <span style="font-size: 18px">拉取镜像</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title"><i class="el-icon-menu"></i>
                                <span style="font-size: 18px">容器管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="/containers">
                                    <span style="font-size: 18px">所有容器</span>
                                </el-menu-item>
                                <el-menu-item index="4-2">
                                    <span style="font-size: 18px">运行的容器</span>
                                </el-menu-item>
                                <el-menu-item index="4-3">
                                    <span style="font-size: 18px">停止的容器</span>
                                </el-menu-item>
                                <el-menu-item index="4-4">
                                    <span style="font-size: 18px">创建容器</span>
                                </el-menu-item>
                                <el-menu-item index="4-5">
                                    <span style="font-size: 18px">删除容器</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                        <el-submenu index="/logs" style="font-size: 20px">
                            <template slot="title"><i class="el-icon-setting"></i>
                                <span style="font-size: 18px">日志管理</span>
                            </template>
                            <el-menu-item-group>
                                <el-menu-item index="5-1">
                                    <span style="font-size: 18px">所有日志</span>
                                </el-menu-item>
                                <el-menu-item index="5-2">
                                    <span style="font-size: 18px">筛选日志</span>
                                </el-menu-item>
                            </el-menu-item-group>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </div>
    </div>
</template>

<script>

export default {
    name: 'App',
    data() {
        return {
            activeIndex: this.$route.path
        }
    },
    methods: {
        handleSelect(key, keyPath) {
            console.log(key);
            console.log(keyPath);
            this.$router.push(key);
        }
    }
}
</script>

<style>
.el-table td, .el-table th {
    text-align: center;
    font-size: 15px;
}
</style>