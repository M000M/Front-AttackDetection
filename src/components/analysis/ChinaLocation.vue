<template>
    <div class="echarts" style="height: 600px; width: 100%">
        <div style="height:600px; width:100%" ref="chinaLocation" id="chinaLocation"></div>
    </div>
</template>
<script>
import axios from "axios"; // 引入中国地图数据
import echarts from 'echarts'
// import * as echarts from 'echarts/dist/echarts'
import 'echarts/map/js/china.js'

export default {
    data() {
        return {
            chart: null,
            chinaIpLocationData:[]
        };
    },
    mounted() {
        this.intervalFetchData();

        this.chinaConfigure();
    },
    beforeDestroy() {
        if (!this.chart) {
            return;
        }
        this.chart.dispose();
        this.chart = null;
    },
    methods: {
        chinaConfigure() {
            let myChart = echarts.init(this.$refs.chinaLocation); //这里是为了获得容器所在位置
            myChart.setOption({ // 进行相关配置
                backgroundColor: "#ffffff",
                tooltip: {}, // 鼠标移到图里面的浮动提示框
                dataRange: {
                    show:true,
                    min: 0,
                    max: 1000,
                    text: ['High', 'Low'],
                    realtime: true,
                    calculable: true,
                    // color: ['red', 'orange', 'yellow', 'cyan', 'lightskyblue']
                    color: ['red', 'orange', 'yellow', 'lightskyblue', 'white']
                },
                geo: { // 这个是重点配置区
                    map: 'china', // 表示中国地图
                    roam: true,
                    label: {
                        normal: {
                            show: true, // 是否显示对应地名
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
                        data: this.chinaIpLocationData
                    }
                ]
            })
        },
        findChinaIpLocationList() {
            axios.get("http://127.0.0.1:5001/location/china").then(res => {
                this.chinaIpLocationData = res.data.data;
            });
        },
        intervalFetchData: function () {
            setInterval(() => {
                this.findChinaIpLocationList();
                this.chinaConfigure();
            }, 1000);
        },
    },
    created() {
        this.findChinaIpLocationList();
        this.chinaConfigure();
    }
}
</script>