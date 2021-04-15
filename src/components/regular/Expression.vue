<template>
    <div>
        <el-table
            :data="tableData"
            border
            :max-height="900">
            <el-table-column label="编号" width="150px" prop="id"></el-table-column>

            <el-table-column label="表达式" prop="expression"></el-table-column>

            <el-table-column label="类型" prop="type">
                <template slot-scope="scope">
                    <div v-if="scope.row.type===1">匹配</div>
                    <div v-if="scope.row.type===2">判断</div>
                </template>
            </el-table-column>

            <el-table-column label="描述" prop="desc"></el-table-column>

            <el-table-column label="对应字段" prop="field"></el-table-column>

            <el-table-column label="操作" width="200px">
                <template slot-scope="scope">
                    <el-row>
                        <el-col :span="12">
                            <el-button @click="handleEdit(scope.$index, scope.row)"
                                       size="mini"
                                       type="primary"
                                       round>编辑
                            </el-button>
                        </el-col>
                        <el-col :span="12">
                            <el-button @click="handleDelete(scope.$index, scope.row)"
                                       size="mini"
                                       type="danger"
                                       round>删除
                            </el-button>
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

        <el-dialog title="添加正则表达式" :visible.sync="dialogFormVisible">
            <el-form :model="expressionForm" ref="expressionForm">
                <el-form-item label="正则表达式" :label-width="formLabelWidth" prop="expression">
                    <el-input v-model="expressionForm.expression" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
                    <el-input v-model="expressionForm.type" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth" prop="desc">
                    <el-input v-model="expressionForm.desc" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="对应字段" :label-width="formLabelWidth" prop="field">
                  <el-input v-model="expressionForm.field" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false;hostForm = {}">取 消</el-button>
                <el-button type="primary" @click="addExpression">确 定</el-button>
            </div>
        </el-dialog>

        <el-dialog title="修改正则表达式" :visible.sync="editExpressionVisible">
            <el-form :model="expressionForm" ref="expressionForm">
                <el-form-item label="正则表达式" :label-width="formLabelWidth" prop="expression">
                    <el-input v-model="expressionForm.expression"></el-input>
                </el-form-item>
                <el-form-item label="类型" :label-width="formLabelWidth" prop="type">
                    <el-input v-model="expressionForm.type"></el-input>
                </el-form-item>
                <el-form-item label="描述" :label-width="formLabelWidth" prop="desc">
                    <el-input v-model="expressionForm.desc"></el-input>
                </el-form-item>
                <el-form-item label="对应字段" :label-width="formLabelWidth" prop="field">
                  <el-input v-model="expressionForm.field"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editExpressionVisible = false;expressionForm = {}">取 消</el-button>
                <el-button type="primary" @click="updateExpression()">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import axios from "axios";

export default {
    name: "Hosts",
    data() {
        return {
            tableData: [],
            dialogFormVisible: false,
            editExpressionVisible: false,
            expressionForm: {
                expression: "",
                type: "",
                desc: "",
                field: "",
                state: 1
            },
            formLabelWidth: '120px',
        }
    },
    methods: {
        updateExpression() {
            axios.post("http://127.0.0.1:7000/expression/edit", this.expressionForm).then(res => {
                if (res.data.status) {
                    this.$message.success({
                        message: "更新正则表达式成功",
                    })
                    this.findAllTableData();
                } else {
                    this.$message.error("更新正则表达式出现错误");
                }
            });
            this.editExpressionVisible = false;
        },

        addExpression() {
            axios.post("http://127.0.0.1:7000/expression/add", this.expressionForm).then(res => {
                if (res.data.status) {
                    this.$message.success({
                        message: "添加正则表达式成功",
                    })
                    this.findAllTableData();
                } else {
                    this.$message.error("添加正则表达式出现错误");
                }
            });
            this.dialogFormVisible = false;
            this.expressionForm = {}
        },

        handleEdit(index, row) {
            this.editExpressionVisible = true;
            this.expressionForm = row;
        },

        handleDelete(index, row) {
            row.valid = 0;
            axios.post("http://127.0.0.1:7000/expression/remove", row).then(res => {
                if (res.data.status) {
                    this.$message.success({
                        message: "删除正则表达式成功",
                    })
                    this.findAllTableData();
                } else {
                    this.$message.error("删除正则表达式出现错误");
                }
            })
        },

        findAllTableData() {
            axios.get("http://127.0.0.1:7000/expression/list").then(res => {
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

</style>