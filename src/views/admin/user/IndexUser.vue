<template>
  <div class="user">
    <NavbarAdmin />
    <div class="container-fluid dashboard text-start">
      <div class="row">
        <SidebarAdmin />
        <main class="col-md-9 col-lg-10 p-4">
          <h1 class="h2">Users</h1>
          <p>List Users</p>
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-6 d-flex align-items-center">List of users</div>
                <div class="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                  <input class="form-control" placeholder="Search name or email.." v-model="filterText" />
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="table-responsive">
                <table class="table table-bordered table-striped">
                  <thead>
                    <tr>
                      <th scope="row" style="width: 20px">No</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Transaksi</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(user, index) in users.data" :key="user.id">
                      <td>{{ (users.current_page - 1) * users.per_page + index + 1 }}</td>
                      <td class="text-capitalize">{{ user.name }}</td>
                      <td>{{ user.email }}</td>
                      <td>{{ user.transactions.length }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div class="card-footer">
              <Bootstrap5Pagination :data="users" @pagination-change-page="getUser" />
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
import { Bootstrap5Pagination } from "laravel-vue-pagination";

export default {
  name: "IndexUser",
  components: {
    NavbarAdmin,
    SidebarAdmin,
    Bootstrap5Pagination,
  },
  data() {
    return {
      users: [],
      filterText: "",
    };
  },
  created() {
    this.getUser();
  },
  methods: {
    getUser(page) {
      axios
        .get("http://localhost:8000/admin/users", {
          params: {
            page: page,
            filter: this.filterText,
          },
        })
        .then((response) => {
          this.users = response.data.data;
        });
    },
  },
  watch: {
    filterText() {
      this.getUser(1, this.filterText);
    },
  },
};
</script>
