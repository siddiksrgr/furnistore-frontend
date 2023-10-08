<template>
  <div class="product">
    <NavbarComponent />
    <section class="container text-start my-5">
      <div class="row">
        <div class="col-md-12">
          <div v-if="show_error" class="alert alert-danger alert-dismissible fade show" role="alert">
            {{ error }}
            <button type="button" @click="show_error = false" class="btn-close" aria-label="Close"></button>
          </div>
        </div>

        <!-- Product Image -->
        <div class="col-md-6">
          <div class="product-thumbnail">
            <img :src="thumbnail" alt="..." />
          </div>
          <div class="row my-3">
            <div class="col-3 col-xl-3 col-md-3 col-sm-3" v-for="image in product.images" :key="image.id">
              <div class="product-images" @click="changeImage(image.image_url)" :class="image.image_url == thumbnail ? 'active' : ''">
                <img :src="image.image_url" alt="..." />
              </div>
            </div>
          </div>
        </div>
        <!-- Product Detail -->
        <div class="col-md-6">
          <h4>{{ product.name }}</h4>
          <h5 class="text-danger mb-3">Rp. {{ formatRupiah(product.price) }}</h5>
          <button @click="addToCart(product.id)" class="btn btn-outline-dark mb-3">Add to cart</button>
          <p class="text-muted">Stock tersisa {{ product.stock }}.</p>
          <p class="text-muted" v-html="product.descriptions"></p>
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
  name: "ProductView",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      product: {},
      thumbnail: "",
      error: "",
      show_error: false,
    };
  },
  computed: {
    loggedIn() {
      return !!localStorage.getItem("token");
    },
  },
  created() {
    axios.get("http://localhost:8000/products/" + this.$route.params.id).then((response) => {
      this.product = response.data.data;
      this.thumbnail = response.data.data.images[0].image_url;
    });
  },
  methods: {
    changeImage(image_url) {
      this.thumbnail = image_url;
    },
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
    addToCart(id) {
      if (this.loggedIn) {
        axios
          .post("http://localhost:8000/carts/" + id)
          .then(() => {
            this.$router.push("/cart");
          })
          .catch((err) => {
            this.error = err.response.data.message;
            this.show_error = true;
          });
      } else {
        this.$router.push("/login");
      }
    },
  },
};
</script>
