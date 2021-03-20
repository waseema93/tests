import Vue from "vue";
import Router from "vue-router";
import Movies from "./components/Movies.vue";
import Movie from "./components/Movie.vue";

Vue.use(Router);
const routes = [
  {
    path: "/",
    name: "movies",
    component: Movies,
  },
  {
    path: "/:id",
    name: "movie",
    component: Movie,
  },
];

const router = new Router({
  routes,
  mode: "history",
});

export default router;
