<template>
    <div id="app">
        <el-container>
            <el-aside width="230px" style="background-color: #ffffff">
                <el-menu :default-openeds="['4', '5']" :default-active="activeIndex"
                         @select="handleSelect">
                    <el-menu-item index="/index">
                        <template slot="title"><i class="el-icon-magic-stick"></i>
                            <span class="sideFont">项目简介</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="/hosts">
                        <template slot="title"><i class="el-icon-monitor"></i>
                            <span class="sideFont">主机管理</span>
                        </template>
                    </el-menu-item>
                    <el-submenu index="3">
                        <template slot="title"><i class="el-icon-message"></i>
                            <span class="sideFont">蜜罐镜像管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="3-1">
                                <span class="subSideFont">查看镜像</span>
                            </el-menu-item>
                            <el-menu-item index="3-2">
                                <span class="subSideFont">拉取镜像</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-menu"></i>
                            <span class="sideFont">容器管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/containers">
                                <span class="subSideFont">所有容器</span>
                            </el-menu-item>
                            <el-menu-item index="/runningContainers">
                                <span class="subSideFont">运行的容器</span>
                            </el-menu-item>
                            <el-menu-item index="/exitedContainers">
                                <span class="subSideFont">停止的容器</span>
                            </el-menu-item>
                            <el-menu-item index="/createContainer">
                                <span class="subSideFont">创建容器</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-setting"></i>
                            <span class="sideFont">日志管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/logs">
                                <span class="subSideFont">所有日志</span>
                            </el-menu-item>
                            <el-menu-item index="/detectResult">
                                <span class="subSideFont">检测结果</span>
                            </el-menu-item>
                            <el-menu-item index="/location">
                                <span class="subSideFont">IP定位</span>
                            </el-menu-item>
                            <el-menu-item index="/chinaLocation">
                                <span class="subSideFont">国内IP定位</span>
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
        handleSelect(key) {
            this.$router.push(key);
        }
    }
}
</script>

<style scoped>
    .el-table td, .el-table th {
        text-align: center;
        font-size: 15px;
        font-family: "宋体", cursive;
    }
    .sideFont {
        font-size: 21px;
        font-family: "宋体", cursive;
    }
    .subSideFont {
        font-size: 19px;
        font-family: "宋体", cursive;
    }
    .el-container {
        padding: 0;
        margin: 0;
    }
</style>