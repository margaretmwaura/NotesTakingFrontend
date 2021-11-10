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
              <label>First Name *</label>
              <input v-model="fname" placeholder="John">
            </div>
            <div class="cell small-12 medium-6 large-6">
              <label>Last Name *</label>
              <input v-model="lname" placeholder="Doe">
            </div>
            <div class="cell small-12 medium-12 large-12">
              <label>Password *</label>
              <input v-model="password" placeholder="Doe">
            </div>
            <div class="cell small-12 medium-12 large-12">
              <button>
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

export default {
  data() {
    return {
      fname: "",
      lname: "",
      password: ""
    }
  }
}
</script>
