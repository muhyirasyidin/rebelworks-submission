import { createApp } from "vue";
import axios from "axios";

// Import Bootstrap an BootstrapVue CSS files (order is important)
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.common.Authorization =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YTYzOWU2ZDQ2MDhmYTIyY2E4MjgwYThhODE5Zjg2YiIsInN1YiI6IjYxNTE1M2U5YzM1MTRjMDA0MzZmYmMyZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.xmGX3PBZ7fqmVI0gn82huqBkCl1QnVsX33_PZasXXp8";

import App from "./App.vue";
import router from "./router";
import store from "./store";

createApp(App).use(store).use(router).mount("#app");
