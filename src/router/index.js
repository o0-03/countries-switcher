import { createRouter, createWebHistory } from "vue-router";
import Index from "@/components/Index.vue";
import Details from "@/components/Details.vue";
import Info from "@/components/Info.vue";
const routes = [
  {
    path: "/",
    name: "Index",
    component: Index,
  },
  {
    path: "/details/:countryName",
    name: "Details",
    component: Details,
    props: (route) => ({ countryName: route.params.countryName }),
  },
  {
    path: "/info",
    name: "Info",
    component: Info,
  },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
