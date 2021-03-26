import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from "@/components/Home";
import Hosts from "@/components/hosts/Hosts";
import Images from "@/components/images/Images";
import Containers from "@/components/containers/Containers";
import Logs from "@/components/logs/Logs";
import RunningContainers from "@/components/containers/RunningContainers";
import ExitedContainers from "@/components/containers/ExitedContainers";
import CreateContainer from "@/components/containers/CreateContainer";
import DetectResult from "@/components/logs/DetectResult";
import WorldLocation from "@/components/logs/WorldLocation";
import ChinaLocation from "@/components/logs/ChinaLocation";
import RealTimeLogs from "@/components/logs/RealTimeLogs";

Vue.use(VueRouter);

const routes = [
    {path: "/index", component: Home},
    {path: "/hosts", component: Hosts},
    {path: "/images", component: Images},
    {path: "/containers", component: Containers},
    {path: "/runningContainers", component: RunningContainers},
    {path: "/exitedContainers", component: ExitedContainers},
    {path: "/createContainer", component: CreateContainer},
    {path: "/logs", component: Logs},
    {path: "/detectResult", component: DetectResult},
    {path: "/worldLocation", component: WorldLocation},
    {path: "/chinaLocation", component: ChinaLocation},
    {path: "/realTimeLogs", component: RealTimeLogs},
]

const router = new VueRouter({
    routes,
    mode: 'history'
});

export default router
