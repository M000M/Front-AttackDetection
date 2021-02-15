<template>
    <div>
<!--        <div style="font-size: 25px; font-family: '宋体', cursive">所有日志</div>-->
<!--        <br>-->

        <el-table
            :data="logData"
            style="width: 100%"
            border
            :max-height="900">
            <el-table-column label="remote_ip" prop="remoteAddr"></el-table-column>

            <el-table-column label="access_time" prop="accessTime"></el-table-column>

            <el-table-column label="user" prop="user"></el-table-column>

            <el-table-column label="param" prop="param"></el-table-column>

            <el-table-column label="httpStatus" prop="httpStatus"></el-table-column>

            <el-table-column label="uri" prop="uri"></el-table-column>

            <el-table-column label="bodyBytesSent" prop="bodyBytesSent"></el-table-column>
        </el-table>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Logs",

    data() {
        return {
            logData: []
        }
    },

    methods: {
        findAllTableData() {
            axios.get("http://127.0.0.1:9000/es/getAll").then(res => {
                this.logData = res.data.data;
            });
        },

        intervalFetchData: function () {
            setInterval(() => {
                this.findAllTableData();
            }, 500);
        }
    },

    mounted() {
        this.intervalFetchData();
    },

    created() {
        this.findAllTableData();
    }
}
</script>

<style scoped>

</style>