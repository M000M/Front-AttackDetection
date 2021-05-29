<template>
    <div>
        <el-table
            :data="logData"
            style="width: 100%"
            border
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'left'}"
            :max-height="900">
            <el-table-column
                label="时间"
                width="200px"
                prop="time">
                <template slot-scope="scope">
                    <span style="display: block;text-align: center;" >{{scope.row.time}}</span>
                </template>
            </el-table-column>
            <el-table-column label="实时日志" prop="log"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "RealTimeLogs",

    data() {
        return {
            logData: [],
            total: 0,
            newTotal: 0,
            logCount: 15
        }
    },

    methods: {

        getLogByPage() {
            axios.get("http://127.0.0.1:9000/es/getTotal").then(res => {
                this.newTotal = res.data.data;
            });
            if (this.newTotal > this.total) {
                this.total = this.newTotal;
                let size = this.logCount;
                console.log(this.total);
                axios.get("http://127.0.0.1:9000/es/getLogByPage", {
                    params: {
                        start: this.total - size,
                        size: size
                    }
                }).then(res => {
                    this.logData = res.data.data;
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