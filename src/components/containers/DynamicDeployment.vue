<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive; margin-left: 40%">动态化部署</div>
        <el-container>
            <el-main>
                <el-form :model="dynamicDeploymentForm" label-width="200px" ref="verificationLog">
                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form-item label="是否开启动态部署">
                                <el-switch
                                    v-model="isDynamicSwitchOn"
                                    active-color="#2E9AFE"
                                    inactive-color="#585858">
                                </el-switch>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="8" :offset="1">
                            <el-form-item label="日志数据编号" prop="logId">
                                <el-input  placeholder="请输入日志数据编号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-main>
        </el-container>


    </div>
</template>

<script>
export default {
    name: "DynamicDeployment",
    data() {
        return {
            isDynamicSwitchOn: true,
            dynamicDeploymentForm: []
        }
    }
}
</script>

<style scoped>

</style>