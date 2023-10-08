<template>
  <div class="login">
    <NavbarComponent />
    <section class="container text-start my-5">
      <div class="row">
        <div class="col-md-6 mx-auto mt-4">
          <form @submit.prevent="submitLogin">
            <div class="card shadow mb-5 bg-body rounded">
              <div class="card-header h4 text-center p-3">Login Form</div>
              <div class="card-body">
                <div class="form-group mb-3">
                  <label class="form-label fw-bold" for="email">Email</label>
                  <input type="email" class="form-control" id="email" placeholder="Masukan Email" v-model="email" :class="{ 'is-invalid': error.email || error.message }" />
                  <div v-if="error.email" class="invalid-feedback">
                    {{ error.email[0] }}
                  </div>
                  <div v-if="error.message" class="invalid-feedback">
                    {{ error.message }}
                  </div>
                </div>
                <div class="form-group mb-3">
                  <label class="form-label fw-bold" for="password">Password</label>
                  <input type="password" class="form-control" id="password" placeholder="Masukan Password" v-model="password" :class="{ 'is-invalid': error.password || error.message }" />
                  <div v-if="error.password" class="invalid-feedback">
                    {{ error.password[0] }}
                  </div>
                  <div v-if="error.message" class="invalid-feedback">
                    {{ error.message }}
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
  name: "LoginView",
  components: {
    NavbarComponent,
    FooterComponent,
  },
  data() {
    return {
      email: "",
      password: "",
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
    submitLogin() {
      let email = this.email;
      let password = this.password;
      this.$store
        .dispatch("LOGIN", {
          email,
          password,
        })
        .then(() => this.$router.push("/"))
        .catch((err) => (this.error = err.response.data));
    },
  },
};
</script>
