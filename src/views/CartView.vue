<template>
  <div class="cart">
    <NavbarComponent />
    <section class="container text-start my-5">
      <div class="row">
        <div class="col-lg-12">
          <div v-if="show_error_cart" class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ error_cart }}
            <button type="button" @click="show_error_cart = false" class="btn-close" aria-label="Close"></button>
          </div>

          <div class="row">
            <div class="col-lg-12 table-responsive">
              <table class="table cart-table">
                <thead>
                  <tr>
                    <th scope="col">IMAGE</th>
                    <th scope="col">PRODUCT NAME</th>
                    <th scope="col">PRICE</th>
                    <th scope="col">QTY</th>
                    <th scope="col">SUBTOTAL</th>
                    <th scope="col">ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="cart in carts" :key="cart.id">
                    <td class="cart-img">
                      <router-link :to="{ name: 'product', params: { id: cart.product.slug } }">
                        <img :src="cart.product.images[0].image_url" alt="..." />
                      </router-link>
                    </td>
                    <td>{{ cart.product.name }}</td>
                    <td>
                      <h5 class="text-danger">Rp. {{ formatRupiah(cart.product.price) }}</h5>
                    </td>
                    <td>
                      <button :disabled="cart.qty == 1" @click="decrease(cart.id)" class="btn btn-sm btn-outline-dark me-2">-</button>
                      {{ cart.qty }}
                      <button :disabled="cart.product.stock == 0" @click="increase(cart.id)" class="btn btn-sm btn-outline-dark ms-2">+</button>
                      <div class="form-text">Tersisa {{ cart.product.stock }}</div>
                    </td>
                    <td>
                      <h5 class="text-danger">Rp. {{ formatRupiah(cart.product.price * cart.qty) }}</h5>
                    </td>
                    <td><button @click="deleteCart(cart.id)" class="btn btn-sm btn-danger">Delete</button></td>
                  </tr>
                  <tr v-if="carts == 0">
                    <td colspan="6" class="text-danger text-center">No Data</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-lg-12 mt-2">
              <h5 class="text-danger float-end"><span class="text-dark">Total = </span>Rp. {{ formatRupiah(total) }}</h5>
            </div>

            <div class="col-lg-12 my-3">
              <div class="card border-secondary">
                <div class="card-header">
                  <h5>Tujuan Pengiriman</h5>
                </div>
                <form @submit.prevent="checkout">
                  <div class="card-body">
                    <div class="form-group mb-3">
                      <label class="form-label" for="name">Nama Penerima</label>
                      <input type="text" class="form-control" :class="{ 'is-invalid': error_form.name }" id="name" v-model="form.name" placeholder="Masukan Nama" />
                      <div v-if="error_form.name" class="invalid-feedback">
                        {{ error_form.name[0] }}
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label class="form-label" for="phone">Nomor Handphone Penerima</label>
                      <input type="tel" class="form-control" :class="{ 'is-invalid': error_form.phone }" id="phone" v-model="form.phone" placeholder="Masukan Nomor Handphone" />
                      <div v-if="error_form.phone" class="invalid-feedback">
                        {{ error_form.phone[0] }}
                      </div>
                    </div>
                    <div class="form-group mb-3">
                      <label class="form-label" for="address">Alamat Lengkap Penerima</label>
                      <textarea class="form-control" :class="{ 'is-invalid': error_form.address }" id="address" rows="3" v-model="form.address"></textarea>
                      <div v-if="error_form.address" class="invalid-feedback">
                        {{ error_form.address[0] }}
                      </div>
                    </div>
                  </div>
                  <div class="card-footer">
                    <button :disabled="total == 0" type="submit" class="btn btn-dark">Checkout</button>
                  </div>
                </form>
              </div>
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
  name: "CartView",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      carts: [],
      error_cart: "",
      show_error_cart: false,
      total: "",
      form: {
        name: "",
        phone: "",
        address: "",
      },
      error_form: [],
    };
  },
  created() {
    this.getCarts();
  },
  watch: {
    carts() {
      this.getTotal();
    },
  },
  methods: {
    getCarts() {
      axios.get("http://localhost:8000/carts").then((response) => {
        this.carts = response.data.data;
      });
    },
    getTotal() {
      axios.get("http://localhost:8000/carts/total").then((response) => {
        this.total = response.data.data;
      });
    },
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
    deleteCart(id) {
      if (confirm("Are you sure to delete data cart?")) {
        axios.delete("http://localhost:8000/carts/" + id).then(() => {
          this.getCarts();
        });
      }
    },
    decrease(id) {
      axios
        .post("http://localhost:8000/carts/decrease/" + id, { _method: "PATCH" })
        .then(() => {
          this.getCarts();
        })
        .catch((err) => {
          this.error_cart = err.response.data.message;
          this.show_error_cart = true;
        });
    },
    increase(id) {
      axios
        .post("http://localhost:8000/carts/increase/" + id, { _method: "PATCH" })
        .then(() => {
          this.getCarts();
        })
        .catch((err) => {
          this.error_cart = err.response.data.message;
          this.show_error_cart = true;
        });
    },
    checkout() {
      if (this.total != 0) {
        let name = this.form.name;
        let phone = this.form.phone;
        let address = this.form.address;
        let total = this.total;
        axios
          .post("http://localhost:8000/checkout", { name, phone, address, total })
          .then((response) => {
            this.$router.push({ name: "payment", params: { id: response.data.data } });
          })
          .catch((err) => {
            this.error_form = err.response.data.data;
          });
      } else {
        this.error_cart = "Data cart kosong";
        this.show_error_cart = true;
      }
    },
  },
};
</script>
