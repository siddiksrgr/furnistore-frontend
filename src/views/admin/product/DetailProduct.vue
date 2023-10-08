<template>
  <div class="product">
    <NavbarAdmin />
    <div class="container-fluid dashboard text-start">
      <div class="row">
        <SidebarAdmin />
        <main class="col-md-9 ml-sm-auto col-lg-10 p-4">
          <h1 class="h2">Detail Product</h1>
          <p>Detail Product</p>
          <div class="card">
            <div class="card-header">Detail Product</div>
            <div class="card-body">
              <p class="fw-bold">
                Name: <span class="fw-normal">{{ product.name }}</span>
              </p>
              <p class="fw-bold">
                Stock: <span class="fw-normal">{{ product.stock }}</span>
              </p>
              <p class="fw-bold">
                Price: <span class="fw-normal">Rp. {{ formatRupiah(product.price) }}</span>
              </p>
              <p class="fw-bold">Descriptions: <span class="fw-normal" v-html="product.descriptions"></span></p>
              <p class="fw-bold mb-2">Images:</p>
              <div class="image-preview-container">
                <div v-for="(image, index) in product.images" :key="index" class="image-item">
                  <img :src="image.image_url" class="image-preview" />
                </div>
              </div>
            </div>
            <div class="card-footer">
              <router-link to="/admin/products" class="btn btn-dark">Back</router-link>
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
  name: "DetailProduct",
  components: {
    NavbarAdmin,
    SidebarAdmin,
  },
  data() {
    return {
      product: {},
    };
  },
  created() {
    axios.get("http://localhost:8000/admin/products/" + this.$route.params.id).then((response) => {
      this.product = response.data.data;
    });
  },
  methods: {
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
  },
};
</script>
