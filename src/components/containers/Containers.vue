<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive">所有容器</div>
        <br>
        <el-table
            :data="tableData"
            style="width: 100%"
            border
            :max-height="900">
            <el-table-column
                label="编号"
                width="55">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>

            <el-table-column label="容器名" prop="name"></el-table-column>

            <el-table-column label="容器ID" prop="containerId"></el-table-column>

            <el-table-column label="镜像名称" prop="image"></el-table-column>

            <el-table-column label="容器状态" prop="state">
                <template slot-scope="scope">
                    <div v-if="scope.row.state==='Running'" class="status-success"></div>
                    <div v-if="scope.row.state==='Exited'" class="status-danger"></div>
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
                    <span v-if="scope.row.state==='Exited'">
                        <el-button
                            size="small"
                            type="success"
                            @click="handleStart(scope.$index, scope.row)">开启
                        </el-button>
                    </span>
                    <span v-if="scope.row.state==='Running'">
                        <el-button
                            size="small"
                            type="info"
                            @click="handleStop(scope.$index, scope.row)">停止
                        </el-button>
                    </span>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Containers",
    data() {
        return {
            tableData: [],
            search: "",
        }
    },
    methods: {
        findAllTableData() {
            axios.get("http://127.0.0.1:9000/sandbox/allContainers").then(res => {
                this.tableData = res.data.data;
            });
        },
        handleStop(index, row) {
            axios.post("http://127.0.0.1:9000/sandbox/stopContainer", row).then(res => {
                if (res.data && res.data.status) {
                    this.$message({
                        message: "停止容器成功",
                        type: 'success'
                    });
                } else {
                    this.$message.error("停止容器失败");
                }
                this.findAllTableData();
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
        }
    },
    created() {
        this.findAllTableData();
    }
}
</script>