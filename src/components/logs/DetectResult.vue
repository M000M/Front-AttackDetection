<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive">检测结果</div>
        <br>

        <el-table
            :data="tableData"
            style="width: 100%"
            border
            :max-height="900">
            <el-table-column
                label="编号"
                width="55">
                <template slot-scope="scope">
                    {{ scope.row.id }}
                </template>
            </el-table-column>

            <el-table-column label="src_ip" prop="srcIp"></el-table-column>

            <el-table-column label="src_port" prop="srcPort"></el-table-column>

<!--            <el-table-column label="dest_port" prop="destPort"></el-table-column>-->

            <el-table-column label="执行的命令" prop="command"></el-table-column>

            <el-table-column label="可能的攻击类型" prop="startTime"></el-table-column>

            <el-table-column label="攻击时间" prop="stopTime"></el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
    name: "Logs"
}
</script>

<style scoped>

</style>