<template>
    <div>
        <div style="font-size: 25px; font-family: '宋体', cursive">项目简介</div>
        <br>
        <p>
            基于分布式沙盒的攻击检测系统
        </p>
    </div>
</template>

<script>
export default {
    name: "Home",
    data() {
        const item = {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
            tableData: Array(20).fill(item)
        }
    }
};
</script>

<style>

</style>