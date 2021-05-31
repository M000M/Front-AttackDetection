<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive; margin-left: 40%">动态化部署</div>
        <br>
        <el-form :model="dynamicDeploymentForm" ref="verificationLog">
            <el-row>
                <el-col>
                    <el-form-item label="是否开启动态化部署" prop="isDynamicSwitchOn">
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

            <el-table-column label="受到的攻击次数" prop="attackCount"></el-table-column>

            <el-table-column label="攻击/数量设定">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="9" :offset="1">
                            <el-input placeholder="最小值" style="width: 80px;" :value="scope.row.minRate"></el-input>
                        </el-col>
                        <el-col :span="9" :offset="3">
                            <el-input placeholder="最大值" style="width: 80px" :value="scope.row.maxRate"></el-input>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>

            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button
                        type="info"
                        circle
                        @click="handleSet(scope.$index, scope.row)">设置
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "DynamicDeployment",
    data() {
        return {
            isDynamicSwitchOn: true,
            dynamicDeploymentForm: {},
            tableData: [
                {
                    image: "cowrie",
                    count: 1,
                    attackCount: 10,
                    minRate: 10,
                    maxRate: 20
                },
                {
                    image: "conpot",
                    count: 1,
                    attackCount: 10,
                    minRate: 10,
                    maxRate: 20
                },
                {
                    image: "adbhoney",
                    count: 1,
                    attackCount: 10,
                    minRate: 10,
                    maxRate: 20
                },
                {
                    image: "honeytrap",
                    count: 1,
                    attackCount: 10,
                    minRate: 10,
                    maxRate: 20
                },
                {
                    image: "citrixhoneypot",
                    count: 1,
                    attackCount: 10,
                    minRate: 10,
                    maxRate: 20
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
        }
    }
}
</script>

<style scoped>

</style>