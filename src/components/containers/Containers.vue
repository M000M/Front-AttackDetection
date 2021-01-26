<template>
    <div>
        <div style="font-size: 25px">所有容器</div>
        <br>
        <el-table
            :data="tableData.filter(data => (!search || data.name.toLowerCase().includes(search.toLowerCase())))"
            style="width: 100%"
            border
            :max-height="300">
            <el-table-column
                label="编号"
                width="70px">
                <template slot-scope="scope">
                    <span style="margin-left: 10px">{{ scope.row.id }}</span>
                </template>
            </el-table-column>

            <el-table-column label="容器名" prop="name"></el-table-column>

            <el-table-column label="容器ID" prop="containerId"></el-table-column>

            <el-table-column label="镜像名称" prop="image"></el-table-column>

            <el-table-column label="容器状态" prop="state"></el-table-column>

            <el-table-column label="状态描述" prop="status"></el-table-column>

            <el-table-column label="内部端口" prop="privatePort"></el-table-column>

            <el-table-column label="外部端口" prop="publicPort"></el-table-column>

            <el-table-column label="容器宿主机" prop="host"></el-table-column>

            <el-table-column label="创建时间" prop="createTime"></el-table-column>

            <el-table-column label="操作">
                <template slot="header" slot-scope="{}">
                    <el-input v-model="search" placeholder="请输入关键字搜索"/>
                </template>
                <template slot-scope="scope">
                    <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑
                    </el-button>
                    <el-popconfirm
                        confirm-button-text='好的'
                        cancel-button-text='不用了'
                        icon="el-icon-info"
                        icon-color="red"
                        title="确定要删除用户吗？"
                        @confirm="handleDelete(scope.$index, scope.row)">
                        <el-button size="mini"
                                   type="danger"
                                   slot="reference">删除
                        </el-button>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Hosts",
    data() {
        return {
            tableData: [],
            search: "",
        }
    },
    methods: {
        findAllTableData() {
            axios.get("http://127.0.0.1:9000/sandbox/containers").then(res => {
                console.log(res.data);
                this.tableData = res.data.data;
            });
        },
        handleDelete(index, row) {
            console.log(index);
            console.log(row);
        },
        handleEdit(index, row) {
            console.log(index);
            console.log(row);
        }
    },
    created() {
        this.findAllTableData();
    }
}
</script>