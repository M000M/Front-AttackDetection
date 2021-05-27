import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/Home";
import Hosts from "@/components/hosts/Hosts";
import Containers from "@/components/containers/Containers";
import AllLogs from "@/components/logs/AllLogs";
import RunningContainers from "@/components/containers/RunningContainers";
import ExitedContainers from "@/components/containers/ExitedContainers";
import CreateContainer from "@/components/containers/CreateContainer";
import Statistics from "@/components/analysis/Statistics";
import WorldLocation from "@/components/analysis/WorldLocation";
import ChinaLocation from "@/components/analysis/ChinaLocation";
import RealTimeLogs from "@/components/logs/RealTimeLogs";
import Expression from "@/components/regular/Expression";
import AllResults from "../components/results/AllResults";
import RealTimeResults from "../components/results/RealTimeResults";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        component: Home,
        meta: {title: "基于分布式沙盒的攻击检测系统"}
    },
    {
        path: "/index",
        component: Home,
        meta: {title: "基于分布式沙盒的攻击检测系统"}
    },

    {
        path: "/hosts",
        component: Hosts,
        meta: {title: "主机管理"}
    },

    {
        path: "/containers",
        component: Containers,
        meta: {title: "所有容器"}
    },
    {
        path: "/runningContainers",
        component: RunningContainers,
        meta: {title: "运行的容器"}
    },
    {
        path: "/exitedContainers",
        component: ExitedContainers,
        meta: {title: "停止的容器"}
    },
    {
        path: "/createContainer",
        component: CreateContainer,
        meta: {title: "创建容器"}
    },

    {
        path: "/realTimeLogs",
        component: RealTimeLogs,
        meta: {title: "实时日志"}
    },
    {
        path: "/allLogs",
        component: AllLogs,
        meta: {title: "所有日志"}
    },

    {
        path: "/expression",
        component: Expression,
        meta: {title: "检测规则"}
    },

    {
        path: "/realTimeResults",
        component: RealTimeResults,
        meta: {title: "实时检测结果"}
    },
    {
        path: "/allResults",
        component: AllResults,
        meta: {title: "所有检测结果"}
    },

    {
        path: "/worldLocation",
        component: WorldLocation,
        meta: {title: "世界地图定位"}
    },
    {
        path: "/chinaLocation",
        component: ChinaLocation,
        meta: {title: "中国地图定位"}
    },
    {
        path: "/statistics",
        component: Statistics,
        meta: {title: "统计分析"}
    },
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router
