<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive">停止的容器</div>
        <br>
        <el-table
            :data="tableData"
            style="width: 100%"
            border
            :max-height="900">
            <el-table-column
                label="编号"
                width="55px">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>

            <el-table-column label="容器名" prop="name"></el-table-column>

            <el-table-column label="容器ID" prop="containerId"></el-table-column>

            <el-table-column label="镜像名称" prop="image"></el-table-column>

            <el-table-column label="容器状态" prop="state">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="8">
                            <div v-if="scope.row.state==='Running'" class="status-success"></div>
                        </el-col>
                        <el-col :span="8" :offset="8">
                            <div v-if="scope.row.state==='Exited'" class="status-danger"></div>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>

            <!--            <el-table-column label="状态描述" prop="status"></el-table-column>-->

            <!--            <el-table-column label="日志目录" prop="logPath"></el-table-column>-->

            <el-table-column label="内部端口" prop="privatePort"></el-table-column>

            <el-table-column label="外部端口" prop="publicPort"></el-table-column>

            <el-table-column label="容器宿主机" prop="host"></el-table-column>

            <el-table-column label="创建时间" prop="createTime"></el-table-column>

            <el-table-column label="操作">
                <template slot="header" slot-scope="{}">
                    <el-input v-model="search" placeholder="请输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="12">
                            <el-button
                                size="small"
                                type="success"
                                @click="handleStart(scope.$index, scope.row)">开启
                            </el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-popconfirm
                                confirm-button-text='好的'
                                cancel-button-text='不用了'
                                icon="el-icon-info"
                                icon-color="red"
                                title="确定要删除容器吗？"
                                @confirm="handleDelete(scope.$index, scope.row)">
                                <el-button size="small"
                                           type="danger"
                                           slot="reference">删除
                                </el-button>
                            </el-popconfirm>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "ExitedContainers",
    data() {
        return {
            tableData: [],
            search: "",
        }
    },
    methods: {
        findAllTableData() {
            axios.get("http://127.0.0.1:9000/sandbox/exitedContainers").then(res => {
                this.tableData = res.data.data;
            });
        },
        handleStart(index, row) {
            axios.post("http://127.0.0.1:9000/sandbox/startContainer", row).then(res => {
                if (res.data && res.data.status) {
                    this.$message({
                        message: "开启容器成功",
                        type: 'success'
                    });
                } else {
                    this.$message.error("开启容器失败");
                }
                this.findAllTableData();
            });
        },
        handleDelete(index, row) {
            axios.post("http://127.0.0.1:9000/sandbox/removeContainer", row).then(res => {
                if (res.data && res.data.status) {
                    this.$message({
                        message: "删除容器成功",
                        type: 'success'
                    });
                } else {
                    this.$message.error("删除容器失败");
                }
                this.findAllTableData();
            });
        }
    },
    created() {
        this.findAllTableData();
    }
}
</script>