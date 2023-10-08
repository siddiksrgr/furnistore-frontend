<template>
  <div class="product">
    <NavbarAdmin />
    <div class="container-fluid dashboard text-start">
      <div class="row">
        <SidebarAdmin />
        <main class="col-md-9 ml-sm-auto col-lg-10 p-4">
          <h1 class="h2">Products</h1>
          <p>List Products</p>
          <div class="card">
            <div class="card-header">
              <div class="row">
                <div class="col-md-6 col-sm-6 col-6 d-flex align-items-center">List of products</div>
                <div class="col-md-6 col-sm-6 col-6 d-flex justify-content-end">
                  <input class="form-control" placeholder="Search product name.." v-model="filterText" />
                </div>
              </div>
            </div>
            <div class="card-body">
              <router-link to="/admin/productsCreate" class="btn btn-sm btn-primary mb-3">Create</router-link>
              <div class="row">
                <div class="col-12 col-md-12 col-xl-12 table-responsive">
                  <table class="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th scope="row" style="width: 20px">No</th>
                        <th scope="col">Name</th>
                        <th scope="col">Stock</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="(product, index) in products.data" :key="product.id">
                        <td>{{ (products.current_page - 1) * products.per_page + index + 1 }}</td>
                        <td>{{ product.name }}</td>
                        <td>{{ product.stock }}</td>
                        <td>Rp. {{ formatRupiah(product.price) }}</td>
                        <td>
                          <router-link :to="{ name: 'products.detail', params: { id: product.slug } }" class="btn btn-sm btn-success me-1">Detail</router-link>
                          <router-link :to="{ name: 'products.edit', params: { id: product.slug } }" class="btn btn-sm btn-warning me-1">Edit</router-link>
                          <button @click="deleteProduct(product.id)" class="btn btn-sm btn-danger me-1">Delete</button>
                        </td>
                      </tr>
                      <tr v-if="products.data == 0">
                        <td colspan="5" class="text-center text-danger">No data</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div class="card-footer">
              <Bootstrap5Pagination :data="products" @pagination-change-page="getProducts" />
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
  name: "IndexProduct",
  components: {
    NavbarAdmin,
    SidebarAdmin,
    Bootstrap5Pagination,
  },
  data() {
    return {
      products: [],
      filterText: "",
    };
  },
  created() {
    this.getProducts();
  },
  methods: {
    getProducts(page) {
      axios
        .get("http://localhost:8000/admin/products", {
          params: {
            page: page,
            filter: this.filterText,
          },
        })
        .then((response) => {
          this.products = response.data.data;
        });
    },
    deleteProduct(id) {
      if (confirm("Are you sure to delete data product?")) {
        axios.delete("http://localhost:8000/admin/products/" + id).then(() => {
          this.getProducts();
        });
      }
    },
    formatRupiah(x) {
      return Number(x).toLocaleString("id-ID");
    },
  },
  watch: {
    filterText() {
      this.getProducts(1, this.filterText);
    },
  },
};
</script>
