<template>
  <div v-if="!isAuthenticated">
    <navbar></navbar>
  </div>
  <router-view/>
</template>


<script>
// @ is an alias to /src
import navbar from './views/Navbar'
export default {
  components: {
    navbar
  },
  computed: {
    isAuthenticated : function(){
      console.log("In App.vue " + this.$store.state.authenticated);
      return this.$store.state.authenticated
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
