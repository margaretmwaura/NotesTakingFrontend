<template>
  <div id="nav">
    <div class="grid-x main">
      <div class="cell small-3 medium-3 large-3 ">
        <div class="main_logo">
          <img src="../assets/images/spiral.png"/>
        </div>
      </div>
      <div class="cell small-7 medium-7 large-7 main_navbar">
        <router-link to="/" >Home</router-link>
        <router-link to="/signup" class="links">Signup </router-link>
        <img src="../assets/images/search.png"/>
      </div>
      <div class="cell small-2 medium-2 large-2">
      </div>
    </div>
  </div>
<!--  <router-view/>-->
</template>

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
