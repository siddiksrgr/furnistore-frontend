import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import authHeader from "./helpers/authHeader";

if (localStorage.token) {
  authHeader(localStorage.token);
} else {
  authHeader(false);
}

createApp(App).use(router).use(store).mount("#app");
