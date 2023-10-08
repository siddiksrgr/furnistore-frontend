<template>
  <div class="payment">
    <NavbarComponent />
    <section class="container text-start my-5">
      <div v-if="errors.length !== 0" class="alert alert-danger alert-dismissible fade show" role="alert">
        <div v-for="(error, index) in errors" :key="index">
          {{ error.toString() }}
        </div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
      </div>

      <div class="row">
        <div class="col-md-6 mb-3">
          <div class="proceed-checkout">
            <ul>
              <li class="subtotal">
                Kode Transaksi <span>{{ transaction.code }}</span>
              </li>
              <li class="subtotal mt-3">
                Total Biaya <span>Rp. {{ formatRupiah(transaction.total_price) }}</span>
              </li>
              <li class="subtotal mt-3">Bank Transfer <span>Mandiri</span></li>
              <li class="subtotal mt-3">No. Rekening <span>1111 2222 3333</span></li>
              <li class="subtotal mt-3">Nama Penerima <span>Siddik</span></li>
            </ul>
            <label for="image" class="proceed-btn">UPLOAD BUKTI TRANSFER (MAX 2 MB)</label>
            <input id="image" type="file" @change="onFileChange" accept="image/*" />
          </div>
          <button :disabled="!image" @click="process" class="btn btn-dark mt-5">Process</button>
        </div>
        <div class="col-md-6" v-if="image_preview">
          <div class="image-preview-container">
            <div class="image-item">
              <img :src="image_preview" class="image-preview-payment" />
              <a class="remove-button" @click="removeImage">X</a>
            </div>
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

export default {
  name: "PaymentView",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      transaction: "",
      image: "",
      image_preview: "",
      errors: "",
    };
  },
  created() {
    axios
      .get("http://localhost:8000/payments/" + this.$route.params.id)
      .then((response) => {
        let transaction_status = response.data.data.transaction_status;
        if (transaction_status == "unpaid") {
          this.transaction = response.data.data;
        } else {
          this.$router.push("/transaction");
        }
      })
      .catch(() => this.$router.push("/transaction"));
  },
  methods: {
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
    onFileChange(event) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.image_preview = reader.result;
      };
      this.image = file;
      reader.readAsDataURL(file);
    },
    removeImage() {
      this.image_preview = "";
      this.image = "";
    },
    process() {
      let data = new FormData();
      data.append("transaction_id", this.transaction.id);
      data.append("image", this.image);
      axios
        .post("http://localhost:8000/payments", data, {
          headers: {
            "content-Type": "multipart/form-data",
          },
        })
        .then(() => {
          this.$router.push("/transaction");
        })
        .catch((err) => {
          this.errors = err.response.data.data;
        });
    },
  },
};
</script>
