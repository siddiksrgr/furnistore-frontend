<template>
  <div class="product">
    <NavbarAdmin />
    <div class="container-fluid dashboard text-start">
      <div class="row">
        <SidebarAdmin />
        <main class="col-md-9 ml-sm-auto col-lg-10 p-4">
          <h1 class="h2">Products</h1>
          <p>Edit Products</p>

          <div v-if="errors.length !== 0" class="alert alert-danger alert-dismissible fade show" role="alert">
            <div v-for="(error, index) in errors" :key="index">
              {{ error.toString() }}
            </div>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
          </div>

          <form @submit.prevent="submit" enctype="multipart/form-data">
            <div class="card">
              <div class="card-header">Form Edit New Product</div>
              <div class="card-body">
                <div class="row">
                  <div class="col-md-6">
                    <div class="form-group mb-3">
                      <label class="form-label fw-bold" for="name">Name</label>
                      <input type="text" class="form-control" id="name" placeholder="Enter product name" v-model="product.name" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mb-3">
                      <label class="form-label fw-bold" for="stock">Stock</label>
                      <input type="number" class="form-control" id="stock" placeholder="Enter product stock" v-model="product.stock" />
                    </div>
                  </div>
                  <div class="col-md-6">
                    <div class="form-group mb-3">
                      <label class="form-label fw-bold" for="price">Price</label>
                      <input type="number" class="form-control" id="price" placeholder="Enter product price" v-model="product.price" />
                    </div>
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label fw-bold" for="images">Images (Optional)</label>
                  <input id="images" type="file" @change="onFileChangeMultiple" accept="image/*" class="form-control" />
                  <div id="images" class="form-text">Maximum size image 2 MB.</div>
                  <div class="image-preview-container mt-3" v-if="images_preview">
                    <div v-for="(image, index) in images_preview" :key="index" class="image-item">
                      <p class="mb-0">images.{{ index }}</p>
                      <img :src="image" class="image-preview" />
                      <a class="remove-button" @click="removeImage(index)">X</a>
                      <p class="mb-0">size: {{ (images[index].size / 1024).toFixed(2) }} KB</p>
                    </div>
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label fw-bold" for="descriptions">Description</label>
                  <!-- <textarea class="form-control" id="description" rows="3" v-model="product.descriptions"></textarea> -->
                  <ckeditor id="descriptions" :editor="editor" v-model="product.descriptions"></ckeditor>
                </div>
              </div>
              <div class="card-footer">
                <router-link to="/admin/products" class="btn btn-outline-dark me-2">Back</router-link>
                <button type="submit" class="btn btn-dark">Submit</button>
              </div>
            </div>
          </form>
        </main>
      </div>
    </div>
  </div>
</template>

<script>
import NavbarAdmin from "@/components/admin/NavbarAdmin.vue";
import SidebarAdmin from "@/components/admin/SidebarAdmin.vue";
import axios from "axios";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import CKEditor from "@ckeditor/ckeditor5-vue";

export default {
  name: "CreateProduct",
  components: {
    NavbarAdmin,
    SidebarAdmin,
    ckeditor: CKEditor.component,
  },
  data() {
    return {
      product: {
        name: "",
        stock: "",
        price: "",
        descriptions: "",
      },
      images: [],
      images_preview: [],
      errors: [],
      editor: ClassicEditor,
    };
  },
  created() {
    axios.get("http://localhost:8000/admin/products/" + this.$route.params.id).then((response) => {
      this.product = response.data.data;
    });
  },
  methods: {
    onFileChangeMultiple(event) {
      const files = event.target.files;
      for (let i = 0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.images_preview.push(e.target.result);
        };
        this.images.push(files[i]);
        reader.readAsDataURL(files[i]);
      }
    },
    removeImage(index) {
      this.images_preview.splice(index, 1);
      this.images.splice(index, 1);
    },
    submit() {
      let name = this.product.name;
      let stock = this.product.stock;
      let price = this.product.price;
      let descriptions = this.product.descriptions;
      let images = this.images;
      axios
        .post(
          "http://localhost:8000/admin/products/" + this.$route.params.id,
          { _method: "PATCH", name, stock, price, images, descriptions },
          {
            headers: {
              "content-Type": "multipart/form-data",
            },
          }
        )
        .then(() => {
          this.$router.push("/admin/products");
        })
        .catch((err) => {
          this.errors = err.response.data.data;
        });
    },
  },
};
</script>

<style>
.ck-editor__editable {
  min-height: 300px;
}
</style>
