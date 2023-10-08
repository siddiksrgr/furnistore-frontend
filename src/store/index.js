import { createStore } from "vuex";
import axios from "axios";
import authHeader from "@/helpers/authHeader";

const url = "http://localhost:8000/";

export default createStore({
  state: {
    status: "",
    token: localStorage.getItem("token") || "",
    user: "",
    role: "",
  },

  mutations: {
    AUTH_REQUEST(state) {
      state.status = "loading";
    },

    AUTH_SUCCESS(state, token) {
      state.status = "success";
      state.token = token;
    },

    AUTH_SET_USER(state, user) {
      state.user = user;
    },

    AUTH_SET_ROLE(state, role) {
      state.role = role;
    },

    AUTH_ERROR(state) {
      state.status = "error";
    },

    AUTH_LOGOUT(state) {
      state.status = "";
      state.token = "";
      state.user = "";
      state.role = "";
    },
  },

  actions: {
    LOGIN({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        axios
          .post(url + "login", {
            email: user.email,
            password: user.password,
          })
          .then((response) => {
            const token = response.data.access_token;
            const user = response.data.user;
            const role = response.data.user.role;

            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
            localStorage.setItem("role", role);

            commit("AUTH_SUCCESS", token);
            commit("AUTH_SET_USER", user);
            commit("AUTH_SET_ROLE", role);

            authHeader(token);

            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    REGISTER({ commit }, user) {
      return new Promise((resolve, reject) => {
        commit("AUTH_REQUEST");
        axios
          .post(url + "register", {
            name: user.name,
            email: user.email,
            password: user.password,
            password_confirmation: user.password_confirmation,
          })
          .then((response) => {
            resolve(response);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    LOGOUT({ commit }) {
      return new Promise((resolve) => {
        commit("AUTH_LOGOUT");
        axios.post(url + "logout");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        resolve();
      });
    },
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
  },

  modules: {},
});
