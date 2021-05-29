<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive; margin-left: 40%">防篡改验证</div>
<!--        <div style="font-size: 25px; font-family: 'Times New Roman', cursive; margin-left: 40%">日志防篡改验证</div>-->
        <el-container>
            <el-main>
                <el-form :model="verificationLogForm" label-width="200px" ref="verificationLog">
                    <el-row>
                        <el-col :span="8" :offset="1">
                            <el-form-item label="日志数据编号" prop="logId">
                                <el-input v-model="verificationLogForm.logId" placeholder="请输入日志数据编号"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form-item label="日志数据" prop="log">
                                <el-input v-model="verificationLogForm.logData" placeholder="日志数据" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form-item label="日志数据Hash1" prop="log">
                                <el-input v-model="verificationLogForm.logHash1" placeholder="日志数据Hash1" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form-item label="日志数据Hash2" prop="log">
                                <el-input v-model="verificationLogForm.logHash2" placeholder="日志数据Hash2" :disabled="true"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form-item label="验证结果" prop="log">
                                <div v-if="verificationLogForm.result===1">
                                    <el-button type="success" icon="el-icon-check" circle></el-button>
                                </div>
                                <div v-if="verificationLogForm.result===2">
                                    <el-button type="danger" icon="el-icon-close" circle></el-button>
                                </div>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>
                    <el-row>
                        <el-col :span="20" :offset="1">
                            <el-form-item label="">
                                <el-button type="primary" @click="verifyLog()">验证</el-button>
                                <el-button style="margin-left: 30px" @click="resetForm()">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
import axios from "axios";
import { sha256 } from 'js-sha256';

export default {
    name: "VerificationLogs",
    data() {
        return {
            verificationLogForm: {
                logId: "",
                logData: "",
                logHash1: "",
                logHash2: "",
                result: 0
            }
        }
    },
    methods: {
        verifyLog() {
            this.getLogById(this.verificationLogForm.logId);
            this.getLogHashById(this.verificationLogForm.logId);
        },
        getLogById(id) {
            axios.get("http://127.0.0.1:7000/verification/getLogById", {
                params: {
                    id: id
                }
            }).then(res => {
                this.verificationLogForm.logData = res.data.data;
            });
        },
        getLogHashById(id) {
            axios.get("http://127.0.0.1:7000/verification/getLogHashById", {
                params: {
                    id: id
                }
            }).then(res => {
                this.verificationLogForm.logHash1 = res.data.data;
                //this.verificationLogForm.logHash2 = sha256(this.verificationLogForm.logData);
                if (this.verificationLogForm.logData !== null) {
                    this.verificationLogForm.logHash2 = sha256(this.verificationLogForm.logData);
                } else {
                    this.verificationLogForm.logHash2 = "";
                }
                if (this.verificationLogForm.logHash1 === this.verificationLogForm.logHash2) {
                    this.verificationLogForm.result = 1;
                } else {
                    this.verificationLogForm.result = 2;
                }
                console.log("hash1: " + this.verificationLogForm.logHash1);
                console.log("hash2: " + this.verificationLogForm.logHash2);
            });
        },
        resetForm() {
            this.verificationLogForm.logId = "";
            this.verificationLogForm.logData = "";
            this.verificationLogForm.logHash1 = "";
            this.verificationLogForm.logHash2 = "";
            this.verificationLogForm.result = 0;
        }
    }
}
</script>

<style scoped>

</style>