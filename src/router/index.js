import { createRouter, createWebHistory } from "vue-router";
import IngredientSearch from "../views/IngredientSearch.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: IngredientSearch,
    },
  ],
});

export default router;
