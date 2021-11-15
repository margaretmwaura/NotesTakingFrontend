<template>
  <div class="register">
    <div class="grid-x grid-margin-x">
      <div class="cell small-12 medium-6 large-6 register_cover">
        <p># 1 Intelligent Note taking App
          <br>
          for in office, mobile and
          <br>
          remote teams
        </p>
        <img src="../assets/images/signup2.jpeg">
      </div>
      <div class="cell small-12 medium-6 large-6 ">
        <div class="register_forms">
          <div class="grid-x grid-margin-x grid-margin-y register_forms_signup">
            <div class="cell small-12 medium-12 large-12 register_forms_signup_switch">
              <button class="signup" v-on:click="start_signup"
                      v-bind:class="{ isActive:signup , isNotActive:login }">Signup
              </button>
              <button class="login" v-on:click="start_login"
                      v-bind:class="{ isActive:login , isNotActive:signup }">Login
              </button>
            </div>
            <div class="cell small-12 medium-6 large-6">
              <label>Username *</label>
              <input v-model="user.name" placeholder="John">
            </div>
            <div class="cell small-12 medium-6 large-6">
              <label>Email *</label>
              <input v-model="user.email" placeholder="Doe">
            </div>
            <div class="cell small-12 medium-12 large-12">
              <label>Password *</label>
              <input v-model="user.password" placeholder="Doe">
            </div>
            <div class="cell small-12 medium-12 large-12 register_forms_signup_action">
              <button v-on:click="register">
                Signup
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import axios from 'axios'

axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8400"
export default {
  data() {
    return {
      auth: {
        email: "",
        password: ""
      },
      user: {
        name: "",
        email: "",
        password: "",
      },
      login: false,
      signup: true
    }
  },
  //Note to self mapGetters is not called like a function but like a variable
  computed: {
    ...mapGetters(['getToken']),
  },
  methods: {
    async register() {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post("/register", this.user).then(({data}) => {
        this.$store.dispatch('settoken', data.token)
        this.getCurrentUser(data.token)
      }).catch(({response: {data}}) => {
        alert(data.message)
      }).finally(() => {
      })
    },
    getCurrentUser(token) {
      // console.log(this.$store.state.token)
      // console.log(this.getToken)
      axios.get('/api/user', {
        headers: {
          'Authorization': `Bearer ${token}`
        },
      }).then(({data}) => {
        this.$store.dispatch('login', data)
      });
    },
    start_signup() {
      this.login = false;
      this.signup = true;
    },
    start_login() {
      this.login = true;
      this.signup = false;
    }
  },
  mounted() {
    console.log("we here")
    console.log(this.$store.state.token)
  },
  created() {
    console.log("we here")
    console.log(this.$store.state.token)
  }
}
</script>

<style>
.isActive {
  z-index: 99;
  opacity: 1;
}

.isNotActive {
  z-index: 1;
  opacity: 0.4;
}
</style>
