<template>
  <!-- Navbar Section Begin -->
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark text-start">
    <div class="container">
      <router-link to="/" class="navbar-brand">FURNISTORE</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0 ms-lg-4">
          <li class="nav-item">
            <router-link to="/" class="nav-link active">Home</router-link>
          </li>
        </ul>
        <div v-if="!isLoggedIn">
          <router-link to="/login" class="btn btn-outline-light me-2">Login</router-link>
          <router-link to="/register" class="btn btn-outline-light me-2">Register</router-link>
        </div>
        <div v-if="isLoggedIn">
          <router-link to="/cart" class="btn btn-outline-light me-2">
            Cart
            <span v-if="carts" class="badge bg-danger text-white rounded-pill">{{ carts }}</span>
          </router-link>
          <div class="dropdown d-inline-block">
            <button class="btn btn-outline-light dropdown-toggle text-capitalize" type="button" data-bs-toggle="dropdown" aria-expanded="false">Hi, {{ user.name }}</button>
            <ul class="dropdown-menu dropdown-menu-dark bg-dark">
              <li><router-link to="/transaction" class="dropdown-item">Transactions</router-link></li>
              <li><hr class="dropdown-divider" /></li>
              <li><a href="#" @click.prevent="logout" class="dropdown-item">Logout</a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </nav>
  <!-- Navbar Section End -->
</template>

<script>
import axios from "axios";

export default {
  name: "NavbarComponent",
  computed: {
    isLoggedIn() {
      return !!localStorage.getItem("token");
    },
  },
  data() {
    return {
      carts: "",
      user: JSON.parse(localStorage.getItem("user")),
    };
  },
  created() {
    if (this.isLoggedIn) {
      axios.get("http://localhost:8000/carts/count").then((response) => {
        this.carts = response.data.data;
      });
    } else {
      this.carts = 0;
    }
  },
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT").then(() => this.$router.push("/login"));
    },
  },
};
</script>
