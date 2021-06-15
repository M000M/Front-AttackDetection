<template>
    <div id="app">
        <el-container>
            <el-aside width="230px" style="background-color: #ffffff">
                <el-menu :default-openeds="['5']" :default-active="activeIndex"
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
                        <template slot="title"><i class="el-icon-menu"></i>
                            <span class="sideFont">沙盒容器管理</span>
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
                            <el-menu-item index="/dynamicDeployment">
                                <span class="subSideFont">动态化部署</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-submenu index="4">
                        <template slot="title"><i class="el-icon-postcard"></i>
                            <span class="sideFont">日志管理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/realTimeLogs">
                                <span class="subSideFont">实时日志</span>
                            </el-menu-item>
                            <el-menu-item index="/allLogs">
                                <span class="subSideFont">所有日志</span>
                            </el-menu-item>
                            <el-menu-item index="/verificationLogs">
                                <span class="subSideFont">防篡改验证</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                    <el-menu-item index="/expression">
                      <template slot="title"><i class="el-icon-document"></i>
                        <span class="sideFont">检测规则</span>
                      </template>
                    </el-menu-item>
                    <el-submenu index="5">
                        <template slot="title"><i class="el-icon-loading"></i>
                            <span class="sideFont">检测结果</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/realTimeResults">
                                <span class="subSideFont">实时检测</span>
                            </el-menu-item>
                            <el-menu-item index="/allResults">
                              <span class="subSideFont">全部结果</span>
                            </el-menu-item>
                        </el-menu-item-group>
                    </el-submenu>
                  <el-submenu index="6">
                    <template slot="title"><i class="el-icon-view"></i>
                      <span class="sideFont">定位与分析</span>
                    </template>
                    <el-menu-item-group>
                      <el-menu-item index="/worldLocation">
                        <span class="subSideFont">国际IP定位</span>
                      </el-menu-item>
                      <el-menu-item index="/chinaLocation">
                        <span class="subSideFont">国内IP定位</span>
                      </el-menu-item>
                      <el-menu-item index="/statistics">
                        <span class="subSideFont">统计分析</span>
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