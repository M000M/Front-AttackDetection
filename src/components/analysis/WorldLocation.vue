<template>
    <div class="echarts"  style="height: 100%; width: 100%">
        <div style="height: 900px; width: 100%" ref="worldLocation"></div>
    </div>
</template>
<script>
import echarts from 'echarts'
// import * as echarts from 'echarts/dist/echarts'
import 'echarts/map/js/world.js'
import axios from "axios";

export default {
    data() {
        return {
            worldIpLocationData: []
        };
    },
    mounted() {
        this.intervalFetchData()

        this.initChart()
    },
    methods: {
        initChart() {
            let myChart = echarts.init(this.$refs.worldLocation); //这里是为了获得容器所在位置
            // 把配置和数据放这里
            myChart.setOption({
                backgroundColor: "#ffffff",
                tooltip: {},  // 鼠标移到图里面的浮动提示框
                dataRange: {
                    show: true,
                    min: 0,
                    max: 100,
                    text: ['High', 'Low'],
                    realtime: true,
                    calculable: true,
                    //color: ['orangered', 'yellow', 'lightskyblue']
                    color: ['red', 'orange', 'yellow', 'lightskyblue', 'white']
                },
                geo: {  // 重点配置区域
                    map: 'world', // 表示世界地图
                    roam: true,
                    label: {
                        normal: {
                            show: false, // 是否显示对应地名
                            textStyle: {
                                color: 'rgba(0, 0, 0, 0.4)'
                            }
                        }
                    },
                    itemStyle: {
                        normal: {
                            borderColor: 'rgba(0, 0, 0, 0.2)'
                        },
                        emphasis: {
                            areaColor: null,
                            shadowOffsetX: 0,
                            shadowOffsetY: 0,
                            shadowBlur: 20,
                            borderWidth: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                },
                series: [{
                        type: 'scatter',
                        coordinateSystem: 'geo' // 对应上方配置
                    },
                    {
                        name: '数量', // 浮动框的标题
                        type: 'map',
                        geoIndex: 0,
                        data: this.worldIpLocationData
                    }
                ]
            });
        },
        findWorldIpLocationList() {
            axios.get("http://127.0.0.1:5001/location/world").then(res => {
                this.worldIpLocationData = res.data.data;
            });
        },
        intervalFetchData: function () {
            setInterval(() => {
                this.findWorldIpLocationList();
                this.initChart();
            }, 1000);
        },
    },
    created() {
        this.findWorldIpLocationList();
        this.initChart();
    }
}
</script>