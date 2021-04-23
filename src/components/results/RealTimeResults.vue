<template>
    <div>
        <el-table
            :data="resultData"
            style="width: 100%"
            border
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'center'}"
            :max-height="900">
            <el-table-column label="时间" prop="datetime"></el-table-column>

            <el-table-column label="攻击源" prop="ip"></el-table-column>

            <el-table-column label="执行的命令" prop="command"></el-table-column>

            <!--      <el-table-column label="新连接" prop="info"></el-table-column>-->

            <el-table-column label="连接持续时间" prop="connectionTime"></el-table-column>

            <el-table-column label="关键信息" prop="coreInfo"></el-table-column>

            <el-table-column label="结果" prop="status"></el-table-column>

            <!--      <el-table-column label="攻击类型" prop="attackType"></el-table-column>-->

            <el-table-column label="其他" prop="other"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "RealTimeResults",

    data() {
        return {
            resultData: [],
            total: 0,
            newTotal: 0,
            resultCount: 10
        }
    },

    methods: {

        getLogByPage() {
            axios.get("http://127.0.0.1:5000/result/getTotal").then(res => {
                this.newTotal = res.data.data;
            });
            if (this.newTotal > this.total) {
                this.total = this.newTotal;
                let size = this.resultCount;
                axios.get("http://127.0.0.1:5000/result/getResultByPage", {
                    params: {
                        start: this.total - size,
                        size: size
                    }
                }).then(res => {
                    this.resultData = res.data.data;
                });
            }
        },

        intervalFetchData: function () {
            setInterval(() => {
                this.getLogByPage();
            }, 500);
        }
    },

    mounted() {
        this.intervalFetchData();
    },

    created() {
        this.getLogByPage();
    }
}
</script>

<style scoped>

</style>