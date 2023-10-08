<template>
  <div class="transaction">
    <NavbarAdmin />
    <div class="container-fluid dashboard text-start">
      <div class="row">
        <SidebarAdmin />
        <main class="col-md-9 ml-sm-auto col-lg-10 p-4">
          <h1 class="h2">Kirim Transaction</h1>
          <p>Kirim transaction</p>
          <div class="card">
            <div class="card-header">Kirim transaction</div>
            <div class="card-body">
              <p class="fw-bold">
                Code: <span class="fw-normal">{{ transaction.code }}</span>
              </p>
              <p class="fw-bold">
                Name: <span class="fw-normal text-capitalize">{{ transaction.name }}</span>
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
                    <td>Rp. {{ formatRupiah(transaction.product.price) }}</td>
                    <td>{{ transaction.qty }}</td>
                    <td>Rp. {{ formatRupiah(transaction.product.price * transaction.qty) }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="form-group">
                <label class="form-label fw-bold" for="resi">Resi :</label>
                <input type="text" :class="{ 'is-invalid': errors.resi }" class="form-control" id="resi" placeholder="Enter resi" v-model="resi" />
                <div v-if="errors.resi" class="invalid-feedback">
                  {{ errors.resi[0] }}
                </div>
              </div>
            </div>
            <div class="card-footer">
              <router-link to="/admin/transactions" class="btn btn-outline-dark me-2">Back</router-link>
              <button type="button" @click="submit" class="btn btn-dark">Submit</button>
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
  name: "ShippingTransaction",
  components: {
    NavbarAdmin,
    SidebarAdmin,
  },
  data() {
    return {
      transaction: {},
      resi: "",
      errors: [],
    };
  },
  created() {
    axios.get("http://localhost:8000/admin/transactions/" + this.$route.params.id).then((response) => {
      let transaction_status = response.data.data.transaction_status;
      if (transaction_status == "paid") {
        this.transaction = response.data.data;
      } else {
        this.$router.push("/admin/transactions");
      }
    });
  },
  methods: {
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
    submit() {
      let data = new FormData();
      data.append("transaction_id", this.transaction.id);
      data.append("resi", this.resi);
      axios
        .post("http://localhost:8000/admin/shippings", data)
        .then(() => {
          this.$router.push("/admin/transactions");
        })
        .catch((err) => {
          this.errors = err.response.data.data;
        });
    },
  },
};
</script>
