<template>
  <div class="register">
    <NavbarComponent />
    <section class="container text-start my-5">
      <div class="row">
        <div class="col-md-6 mx-auto">
          <form @submit.prevent="submitRegister">
            <div class="card shadow mb-5 bg-body rounded">
              <div class="card-header h4 text-center p-3">Register Form</div>
              <div class="card-body">
                <div class="form-group mb-3">
                  <label class="form-label fw-bold" for="nama">Nama</label>
                  <input type="text" class="form-control" id="nama" placeholder="Masukan Nama" v-model="name" :class="{ 'is-invalid': error.name }" />
                  <div v-if="error.name" class="invalid-feedback">
                    {{ error.name[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label fw-bold" for="email">Email</label>
                  <input type="email" class="form-control" id="email" placeholder="Masukan Email" v-model="email" :class="{ 'is-invalid': error.email }" />
                  <div v-if="error.email" class="invalid-feedback">
                    {{ error.email[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label fw-bold" for="password">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="Masukan Password" v-model="password" :class="{ 'is-invalid': error.password }" />
                  <div v-if="error.password" class="invalid-feedback">
                    {{ error.password[0] }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label fw-bold" for="password_confirm">Password Confirmation</label>
                  <input type="password" class="form-control" id="password_confirm" placeholder="Masukan Password Confirmation" v-model="password_confirmation" :class="{ 'is-invalid': error.password }" />
                  <div v-if="error.password" class="invalid-feedback">
                    {{ error.password[0] }}
                  </div>
                </div>
              </div>
              <div class="card-footer p-3">
                <button type="submit" class="btn btn-dark">Submit</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
    <FooterComponent />
  </div>
</template>

<script>
import NavbarComponent from "@/components/NavbarComponent.vue";
import FooterComponent from "@/components/FooterComponent.vue";

export default {
  name: "RegisterView",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
      error: [],
    };
  },
  computed: {
    loggedIn() {
      return !!localStorage.getItem("token");
    },
  },
  created() {
    if (this.loggedIn) {
      this.$router.push("/");
    }
  },
  methods: {
    submitRegister() {
      let name = this.name;
      let email = this.email;
      let password = this.password;
      let password_confirmation = this.password_confirmation;
      this.$store
        .dispatch("REGISTER", {
          name,
          email,
          password,
          password_confirmation,
        })
        .then(() => this.$router.push("/login"))
        .catch((err) => (this.error = err.response.data));
    },
  },
};
</script>
