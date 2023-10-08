<template>
  <div class="home">
    <NavbarComponent />
    <section>
      <div class="header mb-5">
        <div class="header-banner text-center mx-auto p-4">
          <h1 class="fw-bolder">Make Your Home More Comfort</h1>
          <h3 class="fw-normal text-muted">With Our Nice Products</h3>
          <a href="#products" class="btn btn-dark">Shop Now</a>
        </div>
      </div>
      <div class="container my-5" id="products">
        <div class="text-start h3 mb-4">Our Products</div>
        <div class="row">
          <div class="col-md-4 col-lg-3 col-sm-6 mb-4" v-for="product in products" :key="product.id">
            <router-link :to="{ name: 'product', params: { id: product.slug } }">
              <div class="card text-center border-secondary">
                <img :src="product.images[0].image_url" class="card-img-top img-product-home" alt="..." />
                <div class="card-body">
                  <h5 class="card-title text-dark">{{ product.name }}</h5>
                  <h5 class="card-text text-danger">Rp. {{ formatRupiah(product.price) }}</h5>
                </div>
              </div>
            </router-link>
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
  name: "HomeView",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      products: {},
    };
  },
  created() {
    axios.get("http://localhost:8000/products").then((response) => {
      this.products = response.data.data;
    });
  },
  methods: {
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
  },
};
</script>
