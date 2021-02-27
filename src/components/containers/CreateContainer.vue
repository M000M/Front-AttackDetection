<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive">创建容器</div>

        <el-container>
            <el-main>
                <el-form :model="containerForm" label-width="200px" :rules="rules" ref="containerForm">
                    <el-row>
                        <el-col :span="11" :offset="4">
                            <el-form-item label="容器名称" prop="name">
                                <el-input v-model="containerForm.name" placeholder="容器名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>

                    <el-row>
                        <el-col :span="11" :offset="4">
                            <el-form-item label="使用的镜像" prop="image">
                                <el-select v-model="containerForm.image" placeholder="选择镜像" style="width: 50%">
                                    <el-option
                                        v-for="item in images"
                                        :key="item.value"
                                        :label="item.label"
                                        :value="item.value">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>

                    <el-row>
                        <el-col :span="11" :offset="4">
                            <el-form-item label="容器内部端口" prop="privatePort">
                                <el-input v-model="containerForm.privatePort" style="width: 60%" placeholder="容器内部端口(不同种类的蜜罐端口不同)"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>

                    <el-row>
                        <el-col :span="11" :offset="4">
                            <el-form-item label="容器外部端口" prop="publicPort">
                                <el-input v-model="containerForm.publicPort" style="width: 60%" placeholder="容器对外映射端口"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <br>

                    <el-row>
                        <el-col :span="11" :offset="4">
                            <el-form-item label="">
                                <el-button type="primary" @click="dialogVisible = true">创建</el-button>
                                <el-button style="margin-left: 30px" @click="containerForm = {}">重置</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <el-dialog
                    title="提示"
                    :visible.sync="dialogVisible"
                    width="30%">
                    <span>确定要创建吗？</span>
                    <span slot="footer" class="dialog-footer">
                        <el-button @click="dialogVisible = false; containerForm = {}">取消</el-button>
                        <el-button type="primary" @click="createContainer()">确定</el-button>
                    </span>
                </el-dialog>
            </el-main>
        </el-container>

    </div>
</template>

<script>
import axios from 'axios';
export default {
    name: "CreateContainer",
    data () {
        var nameValidator = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("容器名称不能为空！"));
            } else {
                for (var i = 0; i < this.allContainers.length; i++) {
                    if (value === this.allContainers[i].name) {
                        return callback(new Error("该容器名称已经存在，请重试！"));
                    }
                }
                callback();
            }
        };
        var privatePortValidator = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("容器内部端口不能为空！"));
            } else {
                //var reg = /^\d{1,2,3,4,5}$/;
                var reg = /^\d{1,2}$/;
                if (!reg.test(value)) {
                    return callback(new Error("端口只能是 2 ~ 5 位数字"));
                } else {
                    if (value > 65535) {
                        return callback(new Error("端口号必须小于 65535"));
                    } else {
                        return callback();
                    }
                }
            }
        };
        var publicPortValidator = (rule, value, callback) => {
            if (!value) {
                return callback(new Error("容器映射端口不能为空！"));
            } else {
                var reg = /^\d{4,5}$/;
                if (!reg.test(value)) {
                    return callback(new Error("端口只能是 4/5 位数字"));
                } else {
                    for (var i = 0; i < this.allContainers.length; i++) {
                        console.log(value);
                        console.log(this.allContainers[i].publicPort);
                        if (Number(value) === this.allContainers[i].publicPort) {
                            // return callback(new Error("该端口已经被容器 " + this.allContainers[i].name + " 占用，请更换！"));
                            alert("\"该端口已经被容器 \" + this.allContainers[i].name + \" 占用，请更换！\"");
                        }
                    }
                    if (value < 1000) {
                        return callback(new Error("端口号必须大于 1000"))
                    }
                    else if (value > 65535) {
                        return callback(new Error("端口号必须小于 65535"));
                    } else {
                        return callback();
                    }
                }
            }
        };
        return {
            containerForm: {
                name: "",
                image: "",
                privatePort: "",
                publicPort: ""
            },
            images: [{
                value: "cowrie/cowrie",
                label: "cowrie",
            },{
                value: "honey",
                label: "honey"
            },{
                value: "conpot",
                label: "conpot"
            },{
                value: "elasticpot",
                label: "elasticpot"
            },{
                value: "nginx",
                label: "nginx"
            },{
                value: "glastopf",
                label: "glastopf"
            }],
            formLabelWidth: '200px',
            dialogVisible: false,
            allContainers: [],
            rules: {
                name: [
                    {validator: nameValidator, trigger: 'blur'}
                ],
                privatePort: [
                    {validator: privatePortValidator, trigger: 'blur'}
                ],
                publicPort: [
                    {validator: publicPortValidator, trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        createContainer() {
            axios.post("http://127.0.0.1:9000/sandbox/createContainer", this.containerForm).then(res => {
                if (res.data.status) {
                    this.$message({
                        message: "创建容器成功",
                        type: 'success'
                    });
                } else {
                    this.$message.error("创建容器失败");
                }
            });
            this.containerForm = {};
            this.dialogVisible = false;
        }
    },
    created() {
        axios.get("http://127.0.0.1:9000/sandbox/allContainers").then(res => {
            console.log(res.data.data);
            this.allContainers = res.data.data;
        });
    }
}
</script>

<style>
    .el-container {
        height:100%;
        padding:0;
        margin-top: 50px;
        width:100%;
    }
    .el-form-item__label {
        font-size: 18px;
        font-family: "宋体",cursive;
    }
</style>