<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive">主机管理</div>
        <el-table
            :data="tableData"
            border
            :max-height="900">
            <el-table-column label="编号" width="150px" prop="id"></el-table-column>

            <el-table-column label="主机IP" prop="ip"></el-table-column>

            <el-table-column label="微服务端口" prop="port"></el-table-column>

            <el-table-column label="主机状态" prop="status">
                <template slot-scope="scope">
                    <div v-if="scope.row.status===1" class="status-success"></div>
                    <div v-if="scope.row.status===0" class="status-danger"></div>
                </template>
            </el-table-column>

            <el-table-column label="开/关" width="150px">
                <template slot-scope="scope">
                    <span v-if="scope.row.status===1">
                        <el-popconfirm
                            confirm-button-text='确定'
                            cancel-button-text='No'
                            icon="el-icon-info"
                            icon-color="red"
                            title="确定要关闭主机吗？"
                            @confirm="handleShutdown(scope.$index, scope.row)">
                            <el-button size="small"
                                       type="success"
                                       round
                                       slot="reference">关闭
                            </el-button>
                        </el-popconfirm>
                    </span>
                    <span v-if="scope.row.status===0">
                        <el-popconfirm
                            confirm-button-text='确定'
                            cancel-button-text='No'
                            icon="el-icon-info"
                            icon-color="red"
                            title="确定要开启主机吗？"
                            @confirm="handleTurnOn(scope.$index, scope.row)">
                            <el-button size="small"
                                       round
                                       type="info"
                                       slot="reference">开启
                            </el-button>
                        </el-popconfirm>
                    </span>
                </template>
            </el-table-column>

            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="12">
                            <span>
                                <el-button @click="handleEdit(scope.$index, scope.row)"
                                    size="mini"
                                    type="primary"
                                    round>编辑
                                </el-button>
                            </span>
                        </el-col>
                        <el-col :span="9">
                            <span>
                                <el-popconfirm
                                    confirm-button-text='确定'
                                    cancel-button-text='No'
                                    icon="el-icon-info"
                                    icon-color="red"
                                    title="确定要删除主机吗？"
                                    @confirm="handleDelete(scope.$index, scope.row)">
                                    <el-button size="mini"
                                               type="danger"
                                               round
                                               slot="reference">删除
                                    </el-button>
                                </el-popconfirm>
                            </span>
                        </el-col>
                    </el-row>
                </template>
            </el-table-column>
        </el-table>
        <br>
        <el-row>
            <el-col :span="1" :offset="23">
                <div style="position: center">
                    <el-button type="primary" @click="dialogFormVisible = true">添加</el-button>
                </div>
            </el-col>
        </el-row>

        <el-dialog title="添加主机" :visible.sync="dialogFormVisible">
            <el-form :model="hostForm" :rules="rules" ref="hostForm">
                <el-form-item label="IP地址" :label-width="formLabelWidth" prop="ip">
                    <el-input v-model="hostForm.ip" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="微服务端口" :label-width="formLabelWidth" prop="port">
                    <el-input v-model="hostForm.port" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;hostForm = {}">取 消</el-button>
                <el-button type="primary" @click="addHost('hostForm')">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改端口" :visible.sync="editPortVisible">
            <el-form :model="hostForm" :rules="rules" ref="editHostForm">
                <el-form-item label="IP地址" :label-width="formLabelWidth" prop="ip">
                    <el-input v-model="hostForm.ip" readonly></el-input>
                </el-form-item>
                <el-form-item label="微服务端口" :label-width="formLabelWidth" prop="port">
                    <el-input v-model="hostForm.port"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editPortVisible = false;hostForm = {}">取 消</el-button>
                <el-button type="primary" @click="updateHost('editHostForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Hosts",
    data() {
        var hostValidator = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("IP地址不能为空"));
            } else {
                var reg = /^(((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))\.){3}((\d{1,2})|(1\d{2})|(2[0-4]\d)|(25[0-5]))$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error("IP地址格式不正确"));
                }
            }
        };
        var portValidator = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("微服务端口不能为空"));
            } else {
                var reg = /^\d{4,5}$/;
                if (reg.test(value)) {
                    callback();
                } else {
                    callback(new Error("微服务端口为4位或5位数字"));
                }
            }
        }
        return {
            tableData: [],
            dialogFormVisible: false,
            editPortVisible: false,
            hostForm: {
                ip: "",
                port: "",
                status: true,
                state: 1
            },
            formLabelWidth: '120px',
            rules: {
                ip: [
                    {validator:hostValidator, trigger: 'blur'}
                ],
                port: [
                    {validator:portValidator, trigger: 'blur'}
                ]
            },
            switchValue: ""
        }
    },
    methods: {
        updateHost(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    for (var i=0; i < this.tableData.length; i++) {
                        if (this.tableData[i].port === Number(this.hostForm.port)) {
                            if (this.tableData[i].ip === this.hostForm.ip) {
                                this.hostForm = {};
                                this.editPortVisible = false;
                                return false;
                            }
                            alert("端口 " + this.hostForm.port +" 已经被主机 " + this.tableData[i].ip + " 占用，请重试！");
                            this.hostForm = {};
                            this.editPortVisible = false;
                            this.findAllTableData();
                            return false;
                        }
                    }
                    axios.post("http://127.0.0.1:9000/hosts/update", this.hostForm).then(res => {
                        if (res.data.status) {
                            this.$message({
                                message: "修改主机成功",
                                type: 'success'
                            })
                            this.findAllTableData();
                        } else {
                            this.$message.error("修改主机失败");
                        }
                    });
                    this.hostForm = {};
                    this.editPortVisible = false;
                } else {
                    alert("端口格式错误，请重新输入！");
                    this.$refs[formName].resetFields();
                    this.editPortVisible = false;
                    return false;
                }
            })
        },
        addHost(formName) { // 添加主机
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    for (var i=0; i < this.tableData.length; i++) {
                        if (this.tableData[i].ip === this.hostForm.ip) {
                            alert("该主机已经存在，请重新添加！");
                            this.$refs[formName].resetFields();
                            this.dialogFormVisible = false;
                            return false;
                        }
                        if (this.tableData[i].port === Number(this.hostForm.port)) {
                            alert("端口 " + this.hostForm.port +" 已经被主机 " + this.tableData[i].ip + " 占用，请重试！");
                            this.$refs[formName].resetFields();
                            this.dialogFormVisible = false;
                            return false;
                        }
                    }
                    if (confirm("确定吗？")) {
                        axios.post("http://127.0.0.1:9000/hosts/add", this.hostForm).then(res => {
                            if (res.data.status) {
                                this.$message({
                                    message: "添加主机成功",
                                    type: 'success'
                                })
                                this.findAllTableData();
                            } else {
                                this.$message.error("添加主机失败");
                            }
                        })
                        this.hostForm = {};
                        this.dialogFormVisible = false;
                    } else {
                        this.hostForm = {};
                        this.dialogFormVisible = false;
                        return false;
                    }
                } else {
                    alert("IP地址或端口格式错误，请重新输入！");
                    this.$refs[formName].resetFields();
                    this.dialogFormVisible = false;
                    return false;
                }
            })
        },
        handleEdit(index, row) {
            this.editPortVisible = true;
            this.hostForm = row;
        },
        handleShutdown(index, row) { // 关闭主机
            row.status = 0;
            axios.post("http://127.0.0.1:9000/hosts/update", row).then(res => {
                if (res.data.status) {
                    this.$message({
                        message: "关闭主机成功",
                        type: 'success'
                    });
                    this.findAllTableData();
                } else {
                    this.$message.error("关闭主机出现错误");
                }
            });
        },
        handleTurnOn(index, row) { // 打开主机
            row.status = 1;
            axios.post("http://127.0.0.1:9000/hosts/update", row).then(res => {
                if (res.data.status) {
                    this.$message({
                        message: "开启主机成功",
                        type: 'success'
                    })
                    this.findAllTableData();
                } else {
                    this.$message.error("开启主机出现错误");
                }
            })
        },
        handleDelete(index, row) {
            row.status = 0;
            row.state = 0;
            axios.post("http://127.0.0.1:9000/hosts/update", row).then(res => {
                if (res.data.status) {
                    this.$message({
                        message: "删除主机成功",
                    })
                    this.findAllTableData();
                } else {
                    this.$message.error("删除主机出现错误");
                }
            })
        },
        handleSwitch() {
            console.log(this.switchValue);
        },
        findAllTableData() {
            axios.get("http://127.0.0.1:9000/hosts/list").then(res => {
                this.tableData = res.data.data;
            });
        },

    },
    created() {
        this.findAllTableData();
    }
}
</script>

<style>
    .el-table td, .el-table th {
        text-align: center;
        font-size: 15px;
    }
    .status-success{
        display:inline-block;
        width: 10px;
        height:10px;
        background: limegreen;
        border-radius:50%;
    }
    .status-danger{
        display:inline-block;
        width: 10px;
        height:10px;
        background: orangered;
        border-radius:50%;
    }


</style>