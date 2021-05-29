<template>
    <div class="app">
        <el-table
            :data="logData"
            style="width: 100%"
            border
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'left'}"
            :max-height="900">
            <el-table-column
                label="编号"
                width="150px"
                prop="id">
                <template slot-scope="scope">
                    <span style="display: block;text-align: center;" >{{scope.row.id}}</span>
                </template>
            </el-table-column>
            <el-table-column label="日志" prop="message"></el-table-column>
        </el-table>
        <br>
        <div class="tabListPage">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[10, 20, 50, 100]"
                :page-size="size"
                layout="total, sizes, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
import axios from "axios";

export default {
    data() {
        return {
            logData: [],
            // 默认显示第一条
            currentPage: 1,
            total: 0,
            size: 10,
        }
    },
    methods: {
        handleSizeChange(val) {
            // console.log(`每页 ${val} 条`);
            this.size = val;
            let start = (this.currentPage - 1) * this.size;
            this.getLogByPage(start, this.size);
        },
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val;
            let start = (this.currentPage - 1) * this.size;
            this.getLogByPage(start, this.size);
        },

        getTotal() {
            axios.get("http://127.0.0.1:7000/logs/getTotal").then(res => {
                this.total = res.data.data;
            });
        },

        getLogByPage(start, size) {
            axios.get("http://127.0.0.1:7000/logs/getLogsByPage", {
                params: {
                    start: start,
                    size: size
                }
            }).then(res => {
                this.logData = res.data.data;
            })
        }
    },

    created() {
        this.getTotal();
        this.getLogByPage(0, this.size);
    }
}
</script>