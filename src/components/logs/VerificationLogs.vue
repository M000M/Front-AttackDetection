<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive; margin-left: 40%">日志防篡改验证</div>
        <el-container>
            <el-main>
                <el-form :model="verificationLog" label-width="200px" ref="verificationLog">
                    <el-row>
                        <el-col :span="8" :offset="1">
                            <el-form-item label="日志数据编号" prop="logId">
                                <el-input v-model="verificationLog.logId" placeholder="请输入日志数据编号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>

                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form-item label="日志数据" prop="log">
                                <el-input v-model="verificationLog.logData" placeholder="日志数据"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>

                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form-item label="日志数据Hash" prop="log">
                                <el-input v-model="verificationLog.logHash" placeholder="日志数据Hash"></el-input>
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
    name: "VerificationLogs",
    data() {
        return {
            verificationLog: {
                logId: "",
                logData: "",
                logHash: ""
            }
        }
    }
}
</script>

<style scoped>

</style>