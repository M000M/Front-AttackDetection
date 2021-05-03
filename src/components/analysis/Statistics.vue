<template>
    <div>
        <div id="chartColumn" style="width: 100%; height: 400px;">
        </div>
        <br>
        <br>
        <br>
        <div style="text-align: center; font-size: x-large">
            <span> Top 10 Attackers </span>
        </div>
        <br>
        <div>
            <el-table
                :data="mostAttack"
                border>
                <el-table-column label="编号" width="150px">
                    <template scope="scope">
                        <span>{{ scope.$index + 1 }}</span>
                    </template>
                </el-table-column>

                <el-table-column label="IP地址" prop="name"></el-table-column>

                <el-table-column label="攻击次数" prop="value"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
import axios from "axios";

export default {
    data() {
        return {
            chartColumn: null,
            dates: [],
            data: [],
            mostAttack: []
        }
    },
    mounted() {
        // this.drawLine();
        // this.intervalFetchData();
    },
    methods: {
        drawLine() {
            console.log(this.dates);
            console.log(this.data);
            this.chartColumn = echarts.init(document.getElementById('chartColumn'));

            this.chartColumn.setOption({
                title: {text: 'Column Chart'},
                tooltip: {},
                xAxis: {
                    type: 'category',
                    //data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    //data: ['2021-04-11', '2021-04-11', '2021-04-12', '2021-04-13', '2021-04-14', '2021-04-15', '2021-04-16']
                    data: this.dates
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    //data: [302, 276, 326, 332, 323, 297, 1021],
                    data: this.data,
                    type: 'line'
                }]
            });
        },
        find7Dates() {
            axios.get("http://127.0.0.1:5001/statistics/getDates").then(res => {
                this.dates = res.data.data;
                this.drawLine();
            });
        },
        find7Data() {
            axios.get("http://127.0.0.1:5001/statistics/getData").then(res => {
                this.data = res.data.data;
                this.drawLine();
            });
        },
        top10Attack() {
            axios.get("http://127.0.0.1:5001/statistics/getTop10").then(res => {
                this.mostAttack = res.data.data;
            });
        },
        intervalFetchData: function () {
            setInterval(() => {
                this.top10Attack();
                this.find7Dates();
                this.find7Data();
            }, 60000);
        },
    },
    created() {
        this.find7Dates();
        this.find7Data();
        this.top10Attack();
    }
}
</script>