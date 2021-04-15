<template>
    <div>
        <el-table
            :data="logData"
            style="width: 100%"
            border
            :header-cell-style="{'text-align':'center'}"
            :cell-style="{'text-align':'left'}"
            :max-height="900">
            <el-table-column label="时间" prop="time" width="170px"></el-table-column>
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
        }
    },

    methods: {

        getLogByPage() {
            axios.get("http://127.0.0.1:9000/es/getTotal").then(res => {
                this.newTotal = res.data.data;
            });
            if (this.newTotal > this.total) {
                this.total = this.newTotal;
                let size = 20;
                console.log(this.total);
                axios.get("http://127.0.0.1:9000/es/getRealTimeLog", {
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