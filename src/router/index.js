import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/Home";
import Hosts from "@/components/hosts/Hosts";
import Containers from "@/components/containers/Containers";
import AllLogs from "@/components/logs/AllLogs";
import RunningContainers from "@/components/containers/RunningContainers";
import ExitedContainers from "@/components/containers/ExitedContainers";
import CreateContainer from "@/components/containers/CreateContainer";
import Statistics from "@/components/logs/Statistics";
import WorldLocation from "@/components/logs/WorldLocation";
import ChinaLocation from "@/components/logs/ChinaLocation";
import RealTimeLogs from "@/components/logs/RealTimeLogs";
import Expression from "@/components/regular/Expression";

Vue.use(VueRouter);

const routes = [
    {path: "/index", component: Home},
    {path: "/hosts", component: Hosts},
    {path: "/containers", component: Containers},
    {path: "/runningContainers", component: RunningContainers},
    {path: "/exitedContainers", component: ExitedContainers},
    {path: "/createContainer", component: CreateContainer},
    {path: "/allLogs", component: AllLogs},
    {path: "/statistics", component: Statistics},
    {path: "/worldLocation", component: WorldLocation},
    {path: "/chinaLocation", component: ChinaLocation},
    {path: "/realTimeLogs", component: RealTimeLogs},
    {path: "/expression", component: Expression},
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router
