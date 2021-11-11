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
            <div class="cell small-12 medium-12 large-12">
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

import {mapActions, mapGetters} from 'vuex'
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
    }
  },
  methods: {
    ...mapActions(['settoken', 'login']),
    ...mapGetters(['getToken']),
    // async login(){
    //   this.processing = true
    //   await axios.get('/sanctum/csrf-cookie')
    //   await axios.post('/login',this.auth).then(({data})=>{
    //     this.signIn()
    //   }).catch(({response:{data}})=>{
    //     alert(data.message)
    //   }).finally(()=>{
    //
    //   })
    // },
    async register() {
      await axios.get('/sanctum/csrf-cookie')
      await axios.post("/register", this.user).then(({data})=>{
        this.$store.dispatch('settoken', data.token)
        this.getCurrentUser(data.token)
      }).catch(({response:{data}})=>{
        alert(data.message)
      }).finally(()=>{
      })
    },
    getCurrentUser(token){
      console.log(this.$store.state.token)
      axios.get('/api/user',{ headers: {
          'Authorization': `Bearer ${token}`
        },}).then(({data}) =>{

      });
    },
  },
  mounted() {
    console.log("we here")
    console.log(this.$store.state.token)
  },
  created(){
    console.log("we here")
    console.log(this.$store.state.token)
  }
}
</script>
