<template>
  <div class="transaction">
    <NavbarComponent />
    <section class="container text-start my-5">
      <div class="row">
        <div class="col-md-6 mb-3" v-for="transaction in transactions" :key="transaction.id">
          <div class="card border-secondary">
            <div class="card-header">Kode Transaksi : {{ transaction.code }}</div>
            <div class="card-body">
              <p>Tanggal Transaksi : {{ formatDate(transaction.created_at) }}</p>
              <p>
                Tanggal Bayar : <span v-if="transaction.payment">{{ formatDate(transaction.payment.created_at) }}</span>
              </p>
              <p>
                Tanggal Kirim : <span v-if="transaction.shipping">{{ formatDate(transaction.shipping.created_at) }}</span>
              </p>
              <p>Total : Rp. {{ formatRupiah(transaction.total_price) }}</p>
              <p class="text-capitalize">Status : {{ transaction.transaction_status }}</p>
              <p>Nama Penerima : {{ transaction.name }}</p>
              <p>Handphone : {{ transaction.phone }}</p>
              <p>Alamat Kirim : {{ transaction.address }}</p>
              <p>
                Resi : <span v-if="transaction.shipping">{{ transaction.shipping.resi }}</span>
              </p>
            </div>
            <div class="card-footer">
              <router-link :to="{ name: 'transaction.detail', params: { id: transaction.code } }" class="btn btn-outline-dark me-1">Detail</router-link>
              <div v-if="transaction.transaction_status == 'unpaid'" class="d-inline">
                <router-link :to="{ name: 'payment', params: { id: transaction.code } }" class="btn btn-dark">Bayar</router-link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="transactions == 0">
        <div class="row">
          <div class="col-md-12 mt-4">
            <h1 class="text-center text-secondary">No Data</h1>
            <img src="/img/no-data.jpg" class="mx-auto d-block" />
          </div>
        </div>
      </div>
    </section>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";
import axios from "axios";
import moment from "moment";

export default {
  name: "TransactionView",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      transactions: "",
    };
  },
  created() {
    this.getTransactions();
  },
  methods: {
    getTransactions() {
      axios.get("http://localhost:8000/transactions/").then((response) => {
        this.transactions = response.data.data;
      });
    },
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
    formatDate(date) {
      return moment(date).format("DD/MM/YYYY, HH:mm:ss");
    },
  },
};
</script>
