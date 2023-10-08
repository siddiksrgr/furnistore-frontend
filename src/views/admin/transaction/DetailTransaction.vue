<template>
  <div class="transaction">
    <NavbarAdmin />
    <div class="container-fluid dashboard text-start">
      <div class="row">
        <SidebarAdmin />
        <main class="col-md-9 ml-sm-auto col-lg-10 p-4">
          <h1 class="h2">Detail Transaction</h1>
          <p>Detail transaction</p>
          <div class="card">
            <div class="card-header">Detail transaction</div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-4">
                  <p class="fw-bold">
                    Code: <span class="fw-normal">{{ transaction.code }}</span>
                  </p>
                  <p class="fw-bold">
                    Tanggal Transaksi: <span class="fw-normal">{{ formatDate(transaction.created_at) }}</span>
                  </p>
                  <p class="fw-bold">
                    Tanggal Bayar: <span class="fw-normal" v-if="transaction.payment">{{ formatDate(transaction.payment.created_at) }}</span>
                  </p>
                  <p class="fw-bold">
                    Tanggal Kirim: <span class="fw-normal" v-if="transaction.shipping">{{ formatDate(transaction.shipping.created_at) }}</span>
                  </p>
                  <p class="fw-bold" v-if="transaction.user">
                    Name: <span class="fw-normal text-capitalize">{{ transaction.user.name }}</span>
                  </p>
                  <p class="fw-bold">
                    Total: <span class="fw-normal">Rp. {{ formatRupiah(transaction.total_price) }}</span>
                  </p>
                  <p class="fw-bold">
                    Status: <span class="fw-normal text-capitalize">{{ transaction.transaction_status }}</span>
                  </p>
                  <p class="fw-bold">
                    Alamat Kirim:
                    <span class="fw-normal text-capitalize"> {{ transaction.name }}, {{ transaction.phone }}, {{ transaction.address }} </span>
                  </p>
                  <p class="fw-bold">
                    Resi: <span class="fw-normal" v-if="transaction.shipping">{{ transaction.shipping.resi }}</span>
                  </p>
                  <p class="fw-bold mb-2">Bukti Transfer:</p>
                  <div v-if="transaction.payment">
                    <a :href="transaction.payment.photo_url" target="_blank">
                      <img :src="transaction.payment.photo_url" style="height: 400px; width: auto" class="mb-3" />
                    </a>
                  </div>
                </div>
                <div class="col-md-8 table-responsive">
                  <table class="table table-bordered text-center">
                    <thead>
                      <tr>
                        <th scope="col">IMAGE</th>
                        <th scope="col">PRODUCT NAME</th>
                        <th scope="col">PRICE</th>
                        <th scope="col">QTY</th>
                        <th scope="col">SUBTOTAL</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="transaction in transaction.transaction_details" :key="transaction.id">
                        <td>
                          <img :src="transaction.product.images[0].image_url" alt="..." style="width: 80px; height: 80px" />
                        </td>
                        <td>{{ transaction.product.name }}</td>
                        <td>Rp. {{ formatRupiah(transaction.price) }}</td>
                        <td>{{ transaction.qty }}</td>
                        <td>Rp. {{ formatRupiah(transaction.price * transaction.qty) }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <router-link to="/admin/transactions" class="btn btn-dark">Back</router-link>
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
import moment from "moment";

export default {
  name: "DetailTransaction",
  components: {
    NavbarAdmin,
    SidebarAdmin,
  },
  data() {
    return {
      transaction: {},
    };
  },
  created() {
    axios.get("http://localhost:8000/admin/transactions/" + this.$route.params.id).then((response) => {
      this.transaction = response.data.data;
    });
  },
  methods: {
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY, HH:mm:ss");
    },
  },
};
</script>
