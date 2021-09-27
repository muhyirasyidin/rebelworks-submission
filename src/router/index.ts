import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";

// import component
import Home from "../views/movie/index.vue";
import Detail from "../views/movie/Detail/index.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/movie/detail",
    name: "Detail",
    component: Detail,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
