<template>
    <div>
        <div id="chartColumn" style="width: 100%; height: 400px;">
        </div>
        <br>
        <div>
            <span style="text-align: center;">统计得到最多的入侵者</span>
        </div>
        <br>
        <div>
            <el-table
                :data="mostAttack"
                border>
                <el-table-column label="编号" width="150px" prop="id"></el-table-column>

                <el-table-column label="IP地址" prop="ip"></el-table-column>

                <el-table-column label="攻击次数" prop="count"></el-table-column>
            </el-table>
        </div>
    </div>
</template>

<script>
import * as echarts from 'echarts'
export default {
    data(){
        return {
            chartColumn: null,
            mostAttack:[
                {
                    "id": 1,
                    "ip": "139.59.215.250",
                    "count": 621
                },
                {
                    "id": 2,
                    "ip": "118.24.22.2",
                    "count": 558
                },
                {
                    "id": 3,
                    "ip": "115.27.222.222",
                    "count": 503
                },
                {
                    "id": 4,
                    "ip": "115.27.222.222",
                    "count": 460
                },
                {
                    "id": 5,
                    "ip": "115.27.222.222",
                    "count": 402
                },
                {
                    "id": 6,
                    "ip": "107.167.25.226",
                    "count": 378
                },
                {
                    "id": 7,
                    "ip": "112.49.210.238",
                    "count": 301
                },
                {
                    "id": 8,
                    "ip": "103.22.230.24",
                    "count": 265
                },
                {
                    "id": 9,
                    "ip": "119.119.27.35",
                    "count": 202
                },
                {
                    "id": 10,
                    "ip": "96.44.168.108",
                    "count": 198
                },
            ]
        }
    },
    mounted() {
        this.drawLine();
    },
    methods: {
        drawLine(){
            this.chartColumn = echarts.init(document.getElementById('chartColumn'));

            this.chartColumn.setOption({
                title: { text: 'Column Chart' },
                tooltip: {},
                xAxis: {
                    type: 'category',
                    // data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
                    data: ['2021-04-11', '2021-04-11', '2021-04-12', '2021-04-13', '2021-04-14', '2021-04-15', '2021-04-16']
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: [302, 276, 326, 332, 323, 297, 1021],
                    type: 'line'
                }]
            });
        }
    }
}
</script>