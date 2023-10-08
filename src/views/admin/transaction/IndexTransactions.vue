<template>
  <div class="transactions">
    <NavbarAdmin />
    <div class="container-fluid dashboard text-start">
      <div class="row">
        <SidebarAdmin />
        <main class="col-md-9 ml-sm-auto col-lg-10 p-4">
          <h1 class="h2">Transactions</h1>
          <p>List Transactions</p>
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-6 d-flex align-items-center">List of transactions</div>
                <div class="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                  <input class="form-control" placeholder="Search transaction code or name.." v-model="filterText" />
                </div>
              </div>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-12 col-md-12 col-xl-12 table-responsive">
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th scope="row" style="width: 20px">No</th>
                        <th scope="col">Code</th>
                        <th scope="col">User</th>
                        <th scope="col">Total</th>
                        <th scope="col">Status</th>
                        <th scope="col">Resi</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(transaction, index) in transactions.data" :key="transaction.id">
                        <td>{{ (transactions.current_page - 1) * transactions.per_page + index + 1 }}</td>
                        <td>{{ transaction.code }}</td>
                        <td class="text-capitalize">{{ transaction.user.name }}</td>
                        <td>Rp. {{ formatRupiah(transaction.total_price) }}</td>
                        <td class="text-capitalize">{{ transaction.transaction_status }}</td>
                        <td>
                          <div v-if="transaction.shipping">{{ transaction.shipping.resi }}</div>
                        </td>
                        <td>
                          <div class="d-flex">
                            <router-link :to="{ name: 'transactions.detail', params: { id: transaction.code } }" class="btn btn-sm btn-success me-1">Detail</router-link>
                            <div v-if="transaction.transaction_status == 'paid'">
                              <router-link :to="{ name: 'transactions.shipping', params: { id: transaction.code } }" class="btn btn-sm btn-primary me-1">Kirim</router-link>
                            </div>
                          </div>
                        </td>
                      </tr>
                      <tr v-if="transactions.data == 0">
                        <td colspan="7" class="text-center text-danger">No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <Bootstrap5Pagination :data="transactions" @pagination-change-page="getTransactions" />
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
  name: "IndexTransactions",
  components: {
    NavbarAdmin,
    SidebarAdmin,
    Bootstrap5Pagination,
  },
  data() {
    return {
      transactions: [],
      filterText: "",
    };
  },
  created() {
    this.getTransactions();
  },
  methods: {
    getTransactions(page) {
      axios
        .get("http://localhost:8000/admin/transactions", {
          params: {
            page: page,
            filter: this.filterText,
          },
        })
        .then((response) => {
          this.transactions = response.data.data;
        });
    },
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
  },
  watch: {
    filterText() {
      this.getTransactions(1, this.filterText);
    },
  },
};
</script>
