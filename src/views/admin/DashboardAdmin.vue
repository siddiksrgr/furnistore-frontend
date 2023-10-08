<template>
  <div class="dashboard">
    <NavbarAdmin />
    <div class="container-fluid dashboard text-start">
      <div class="row">
        <SidebarAdmin />
        <main class="col-md-9 ml-sm-auto col-lg-10 p-4">
          <h1 class="h2">Dashboard</h1>
          <p>Dashboard Page</p>
          <div class="card">
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  <router-link to="/admin/transactions">
                    <div class="card text-white bg-primary mb-3">
                      <div class="card-body">
                        <h5 class="card-title">Transactions</h5>
                        <p class="card-text h1 text-end">{{ data.transactions }}</p>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="col-md-4">
                  <router-link to="/admin/products">
                    <div class="card text-white bg-success mb-3">
                      <div class="card-body">
                        <h5 class="card-title">Products</h5>
                        <p class="card-text h1 text-end">{{ data.products }}</p>
                      </div>
                    </div>
                  </router-link>
                </div>
                <div class="col-md-4">
                  <router-link to="/admin/users">
                    <div class="card text-dark bg-warning mb-3">
                      <div class="card-body">
                        <h5 class="card-title">Users</h5>
                        <p class="card-text h1 text-end">{{ data.users }}</p>
                      </div>
                    </div>
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/admin/NavbarAdmin.vue";
import SidebarAdmin from "@/components/admin/SidebarAdmin.vue";
import axios from "axios";

export default {
  name: "DashboardAdmin",
  components: {
    NavbarAdmin,
    SidebarAdmin,
  },
  data() {
    return {
      data: {},
    };
  },
  created() {
    axios.get("http://localhost:8000/admin/dashboard").then((response) => {
      this.data = response.data.data;
    });
  },
};
</script>
