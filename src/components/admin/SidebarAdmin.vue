<template>
  <nav id="sidebar" class="col-md-3 col-lg-2 d-md-block bg-white sidebar collapse p-0">
    <ul class="nav flex-column list-group list-group-flush">
      <li class="nav-item list-group-item">
        <router-link active-class="active-link" exact-active-class="exact-active-link" to="/dashboard" class="nav-link">Dashboard</router-link>
      </li>
      <li class="nav-item list-group-item">
        <router-link active-class="active-link" exact-active-class="exact-active-link" to="/admin/users" class="nav-link">Users</router-link>
      </li>
      <li class="nav-item list-group-item">
        <router-link active-class="active-link" exact-active-class="exact-active-link" to="/admin/products" class="nav-link">Products</router-link>
      </li>
      <li class="nav-item list-group-item">
        <router-link active-class="active-link" exact-active-class="exact-active-link" to="/admin/transactions" class="nav-link">Transactions</router-link>
      </li>
      <li class="nav-item list-group-item">
        <a href="" class="nav-link" @click.prevent="logout">Logout </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: "SidebarAdmin",
  methods: {
    logout() {
      this.$store.dispatch("LOGOUT").then(() => this.$router.push("/login"));
    },
  },
};
</script>
