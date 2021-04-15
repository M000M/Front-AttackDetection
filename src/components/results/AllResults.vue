<template>
  <div class="app">
    <el-table
        :data="resultData"
        style="width: 100%"
        border
        :header-cell-style="{'text-align':'center'}"
        :cell-style="{'text-align':'left'}"
        :max-height="900">
      <el-table-column label="时间" prop="datetime" width="150px"></el-table-column>

      <el-table-column label="攻击源" prop="ip"></el-table-column>

      <el-table-column label="命令" prop="command"></el-table-column>

      <el-table-column label="新连接" prop="info"></el-table-column>

      <el-table-column label="连接持续时间" prop="connectionTime"></el-table-column>

      <el-table-column label="关键信息" prop="coreInfo"></el-table-column>

      <el-table-column label="结果" prop="status"></el-table-column>

      <el-table-column label="攻击类型" prop="attackType"></el-table-column>

      <el-table-column label="其他" prop="other"></el-table-column>
    </el-table>
    <br>
    <div class="tabListPage">
      <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      resultData: [],
      // 默认显示第一条
      currentPage: 1,
      total: 0,
      size: 10,
    }
  },
  methods: {
    handleSizeChange(val) {
      // console.log(`每页 ${val} 条`);
      this.size = val;
      let start = (this.currentPage - 1) * this.size;
      this.getLogByPage(start, this.size);
    },
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      let start = (this.currentPage - 1) * this.size;
      this.getLogByPage(start, this.size);
    },

    getTotal() {
      axios.get("http://127.0.0.1:5000/result/getTotal").then(res => {
        this.total = res.data.data;
      });
    },

    getResultByPage(start, size) {
      axios.get("http://127.0.0.1:5000/result/getAll", {
        params: {
          start: start,
          size: size
        }
      }).then(res => {
        this.resultData = res.data.data;
      })
    }
  },

  created() {
    this.getTotal();
    this.getResultByPage(0, this.size);
  }
}
</script>