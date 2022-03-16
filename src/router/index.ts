import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import ResultsView from "../views/ResultsView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "home",
    component: ResultsView,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
