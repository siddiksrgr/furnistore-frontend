<template>
  <div class="transaction">
    <NavbarComponent />
    <section class="container text-start my-5">
      <div class="card">
        <div class="card-header">Kode Transaksi : {{ transaction.code }}</div>
        <div class="card-body">
          <div class="row">
            <div class="col-md-5">
              <p>Total : Rp. {{ formatRupiah(transaction.total_price) }}</p>
              <p class="text-capitalize">Status : {{ transaction.transaction_status }}</p>
              <p>Nama Penerima : {{ transaction.name }}</p>
              <p>Handphone : {{ transaction.phone }}</p>
              <p>Alamat Kirim : {{ transaction.address }}</p>
              <p>
                Resi : <span class="fw-normal" v-if="transaction.shipping">{{ transaction.shipping.resi }}</span>
              </p>
              <p>Bukti Transfer:</p>
              <div v-if="transaction.payment">
                <a :href="transaction.payment.photo_url" target="_blank">
                  <img :src="transaction.payment.photo_url" style="height: 500px; width: auto" class="mb-3" />
                </a>
              </div>
            </div>
            <div class="col-md-7 table-responsive">
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
          <router-link to="/transaction" class="btn btn-dark">Back</router-link>
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

export default {
  name: "TransactionDetail",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      transaction: "",
    };
  },
  created() {
    axios.get("http://localhost:8000/transactions/" + this.$route.params.id).then((response) => {
      this.transaction = response.data.data;
    });
  },
  methods: {
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
  },
};
</script>
