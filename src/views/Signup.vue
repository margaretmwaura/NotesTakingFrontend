<template>
    <div class="register">
      <div class="grid-x">
        <div class="cell small-12 medium-6 large-6 register_cover">
          <p># 1 Intelligent Note taking App
            <br>
            for in office, mobile and
            <br>
            remote teams
          </p>
          <img src="../assets/images/signup2.jpeg">
          <h6>
            Collaboration in a workplace involves a group of people sharing their ideas and skills in order to achieve a
            common goal. Working collaboratively, instead of individually, helps improve productivity and gives employees
            a sense of purpose in the organization. It also becomes easier to brainstorm ideas to solve an existing
            problem or deliver the required work on time.
          </h6>
        </div>
        <div class="cell small-12 medium-6 large-6 ">
          <div class="register_forms">
            <div class="cell small-12 medium-12 large-12 register_forms_switch">
              <button class="signup" v-on:click="start_signup"
                      v-bind:class="{ isActive:signup , isNotActive:login }">Signup
              </button>
              <button class="login" v-on:click="start_login"
                      v-bind:class="{ isActive:login , isNotActive:signup }">Login
              </button>
            </div>
            <div class="grid-x grid-margin-y register_forms_signup" v-show="signup">
              <div class="cell small-12 medium-6 large-6 register_forms_signup_names">
                <label>First Name <span>*</span></label>
                <input v-model="fname" placeholder="John" type="text">
                <i class="fa fa-user" aria-hidden="true"></i>
              </div>
              <div class="cell small-12 medium-6 large-6 register_forms_signup_names">
                <label>Last Name <span>*</span></label>
                <input v-model="lname" placeholder="Doe" type="text">
                <i class="fa fa-user " aria-hidden="true"></i>
              </div>
              <div class="cell small-12 medium-12 large-12 register_forms_signup_details">
                <label>Email <span>*</span></label>
                <input v-model="user.email" placeholder="gregory@gmail.com" type="email">
                <i class="far fa-envelope-open" aria-hidden="true"></i>
              </div>
              <div class="cell small-12 medium-12 large-12 register_forms_signup_details">
                <label>Password <span>*</span></label>
                <input v-model="user.password" placeholder="123" :type="passwordFieldType" type="text">
                <i class="far" :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
                   aria-hidden="true"
                   @click="switchVisibility"></i>
              </div>
              <div class="cell small-12 medium-12 large-12 register_forms_signup_disclaimer">
                <ul class="mandatory">
                  <li>Contains at-least one uppercase</li>
                  <li>Contains at-least one letter</li>
                </ul>
                <ul class="optional">
                  <li>Contains at-least one special character</li>
                </ul>
              </div>
              <div class="cell small-12 medium-12 large-12 register_forms_signup_action">
                <button v-on:click="registerUser">
                  Signup
                </button>
              </div>
            </div>
            <div class="grid-x grid-margin-y register_forms_signup" v-show="login">
              <div class="cell small-12 medium-12 large-12 register_forms_signup_pr">
                <p>Welcome Partner</p>
                <p>It is a pleasure having you back</p>
              </div>
              <div class="cell small-12 medium-12 large-12 register_forms_signup_details">
                <label>Email <span>*</span></label>
                <input v-model="auth.email" placeholder="gregory@gmail.com" type="text">
                <i class="far fa-envelope-open" aria-hidden="true"></i>
              </div>
              <div class="cell small-12 medium-12 large-12 register_forms_signup_details">
                <label>Password <span>*</span></label>
                <input v-model="auth.password" placeholder="123" :type="passwordFieldType" type="text">
                <i class="far" :class="[showPassword ? 'fa-eye' : 'fa-eye-slash']"
                   aria-hidden="true"
                   @click="switchVisibility"></i>
              </div>
              <div class="cell small-12 medium-12 large-12 register_forms_signup_disclaimer">
                <ul class="mandatory">
                  <li>Contains at-least one uppercase</li>
                  <li>Contains at-least one letter</li>
                </ul>
                <ul class="optional">
                  <li>Contains at-least one special character</li>
                </ul>
              </div>
              <div class="cell small-12 medium-12 large-12 register_forms_signup_action">
                <button v-on:click="loginUser">
                  Login
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
      signup: true,
      showPassword: false,
      passwordFieldType: "password",
      fname: '',
      lname: ''
    }
  },
  //Note to self mapGetters is not called like a function but like a variable
  computed: {
    ...mapGetters(['getToken']),
    username: function () {
      return this.fname + this.lname
    }
  },
  methods: {
    async registerUser() {
      await axios.get('/sanctum/csrf-cookie')
      this.user.name = this.username
      await axios.post("/register", this.user).then(({data}) => {
        this.$store.dispatch('settoken', data.token)
        if (data.status === 200) {
          this.$store.dispatch('login', data.data)
          this.$toast.success(`Signup was successful`);
          this.$router.push({name: 'Notes'})
          // window.location.href = '/dashboard';
        } else {
          this.$toast.error(`Signup failed`);
        }
      }).catch(({response: {data}}) => {
        this.$toast.error(`Signup failed`);
      }).finally(() => {
      })
    },
    async loginUser() {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post("/login", this.auth).then(({data}) => {
        this.$store.dispatch('settoken', data.token)
        if (data.status === 200) {
          this.$store.dispatch('login', data.data)
          this.$toast.success(`Login was successful`);
          this.$router.push({name: 'Dashboard'})
        } else {
          this.$toast.error(`Login failed`);
        }
      }).catch(({response: {data}}) => {
        this.$toast.error(`Login failed`);
      }).finally(() => {
      })
    },
    start_signup() {
      this.login = false;
      this.signup = true;
    },
    start_login() {
      this.login = true;
      this.signup = false;
    },
    switchVisibility() {
      this.showPassword = this.showPassword !== true;
      this.passwordFieldType = this.passwordFieldType === "password" ? "text" : "password";
    }
  },
  mounted() {
    // console.log("we here")
    // console.log(this.$store.state.token)
  },
  created() {
    // console.log("we here")
    // console.log(this.$store.state.token)
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
