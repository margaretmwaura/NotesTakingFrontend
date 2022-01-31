<template>
  <div v-show="!isAuthenticated">
    <landing></landing>
  </div>
  <div v-show="isAuthenticated">
    <dashboard></dashboard>
  </div>
</template>


<script>
// @ is an alias to /src
import landing from './views/Landing'
import dashboard from './views/Dashboard'
export default {
  components: {
    landing,
    dashboard
  },
  computed: {
    isAuthenticated : function(){
      // this.$store.state.authenticated  && this.$store.state.user.email_verified_at && this.$store.state.user.email_verified_at !== null
      console.log("In App.vue " + this.$store.state.authenticated);
      console.log("Verified " + this.$store.state.user.email_verified_at != null)
      console.log("Verified value is " + this.$store.state.user.email_verified_at)
      if(this.$store.state.authenticated && this.$store.state.user.email_verified_at){
        console.log("first if")
        return true
      }else{
        console.log("second if")
        return false
      }
    },
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  a {
    font-weight: bold;
    color: #000;
    text-decoration: none;

    &.router-link-exact-active {
      color: #917ECE;
    }
  }
}
</style>
