<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive; margin-left: 40%">动态化部署</div>
        <el-form :model="dynamicDeploymentForm" ref="verificationLog">
            <el-row>
                <el-col>
                    <el-form-item label="是否开启检测状况监测" prop="isDynamicSwitchOn">
                        <el-switch
                            v-model="isDynamicSwitchOn"
                            active-color="#2E9AFE"
                            inactive-color="#585858"
                            @change="handleChange">
                        </el-switch>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table
            :data="tableData"
            style="width: 100%"
            border
            :max-height="900"
            v-if="isDynamicSwitchOn">
            <el-table-column
                label="编号"
                width="100">
                <template slot-scope="scope">
                    {{ scope.$index + 1 }}
                </template>
            </el-table-column>

            <el-table-column label="容器类型" prop="image"></el-table-column>

            <el-table-column label="容器数量" prop="count"></el-table-column>

            <el-table-column label="最近所受攻击次数" prop="attackCount"></el-table-column>

            <el-table-column label="攻击次数/沙盒数量比" prop="rate"></el-table-column>

            <el-table-column label="攻击次数/沙盒数量比上限">
                <template slot-scope="scope">
                    <el-row type="flex" justify="center">
                        <el-col :span="9" :offset="2">
                            <el-input placeholder="比值上限" style="width: 120px;" :value="scope.row.maxRate"></el-input>
                        </el-col>
                        <el-col :span="8" :offset="4">
                            <el-button
                                type="info"
                                size="medium"
                                circle
                                @click="handleSet(scope.$index, scope.row)">设置
                            </el-button>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
<!--                <template slot-scope="scope">-->
<!--                    <el-row>-->
<!--                        <el-col :span="9" :offset="1">-->
<!--                            <el-input placeholder="最小值" style="width: 80px;" :value="scope.row.minRate"></el-input>-->
<!--                        </el-col>-->
<!--                        <el-col :span="9" :offset="3">-->
<!--                            <el-input placeholder="最大值" style="width: 80px" :value="scope.row.maxRate"></el-input>-->
<!--                        </el-col>-->
<!--                    </el-row>-->
<!--                </template>-->

<!--            <el-table-column label="操作">-->
<!--                <template slot-scope="scope">-->
<!--                    <el-button-->
<!--                        type="info"-->
<!--                        circle-->
<!--                        @click="handleSet(scope.$index, scope.row)">设置-->
<!--                    </el-button>-->
<!--                </template>-->
<!--            </el-table-column>-->
        </el-table>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "DynamicDeployment",
    data() {
        return {
            isDynamicSwitchOn: true,
            dynamicDeploymentForm: {},
            tableData: [
                {
                    image: "cowrie",
                    count: 0,
                    attackCount: 0,
                    minRate: 10,
                    maxRate: 100,
                    rate: 0
                },
                {
                    image: "conpot",
                    count: 0,
                    attackCount: 0,
                    minRate: 10,
                    maxRate: 100,
                    rate: 0
                },
                {
                    image: "adbhoney",
                    count: 0,
                    attackCount: 0,
                    minRate: 10,
                    maxRate: 100,
                    rate: 0
                },
                {
                    image: "honeytrap",
                    count: 0,
                    attackCount: 0,
                    minRate: 10,
                    maxRate: 100,
                    rate: 0
                },
                {
                    image: "citrixhoneypot",
                    count: 0,
                    attackCount: 0,
                    minRate: 10,
                    maxRate: 100,
                    rate: 0
                }
            ]
        }
    },
    methods: {
        handleChange() {
            console.log(this.isDynamicSwitchOn);
        },
        handleSet(index, row) {
            console.log(index);
            console.log(row);
        },
        getRunningContainerCountByImageName(index, imageName) {
            axios.get("http://127.0.0.1:9000/dynamic/getCountByImageName", {
                params: {
                    imageName: imageName
                }
            }).then(res => {
                this.tableData[index].count = res.data.data;
            });
        },
        getRecentAttackByImageName(index, key) {
            axios.get("http://127.0.0.1:9000/dynamic/getRecentAttackCount", {
                params: {
                    key: key
                }
            }).then(res => {
                this.tableData[index].attackCount = res.data.data;
            });
        },
        intervalFetchData: function () {
            setInterval(() => {
                if (this.isDynamicSwitchOn) {
                    this.getRunningContainerCountByImageName(0, "cowrie/cowrie:latest");
                    this.getRunningContainerCountByImageName(1, "conpot:latest");
                    this.getRunningContainerCountByImageName(2, "adbhoney:latest");
                    this.getRunningContainerCountByImageName(3, "honeytrap/honeytrap:latest");
                    this.getRunningContainerCountByImageName(4, "citrixhoneypot:latest");

                    this.getRecentAttackByImageName(0, "cowrie");
                    this.getRecentAttackByImageName(1, "conpot");
                    this.getRecentAttackByImageName(2, "adbhoney");
                    this.getRecentAttackByImageName(3, "honeytrap");
                    this.getRecentAttackByImageName(4, "citrixhoneypot");

                    for (let index = 0; index <= 4; index++) {
                        let attackCount = this.tableData[index].attackCount;
                        let sandBoxCount = this.tableData[index].count;
                        if (sandBoxCount !== 0) {
                            this.tableData[index].rate = Math.round(attackCount / sandBoxCount);
                        } else {
                            this.tableData[index].rate = 0;
                        }
                    }
                } else {
                    for (let index = 0; index <= 4; index++) {
                        this.tableData[index].attackCount = 0;
                    }
                }
            }, 3000);
        }
    },

    mounted() {
        this.intervalFetchData();
    },

    created() {
    }
}
</script>

<style scoped>

</style>