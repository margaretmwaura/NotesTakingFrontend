<template>
  <transition name="fade">
    <div class="modal" v-if="show">
      <div class="modal__backdrop" @click="closeModal()"/>
      <div class="modal__dialog">
        <div class="modal__body">
          <slot name="body"/>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: "confirmation_modal",
  data() {
    return {
      show: false
    };
  },
  methods: {
    closeModal() {
      this.show = false;
      document.querySelector("body").classList.remove("overflow-hidden");
    },
    openModal() {
      this.show = true;
      document.querySelector("body").classList.add("overflow-hidden");
    }
  }
};
</script>


<style lang="scss" scoped>
@import "./src/assets/sass/colors.scss";
.modal {
  position: relative;
  z-index: 9;

  &__backdrop {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background: rgba(black, 0.7);
  }

  &__dialog {
    position: absolute;
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    right: -150%;
    @media screen and (max-width: 992px) {
      right: 0;
      width: 320px;
      margin: 0 auto;
    }
  }


  &__close {
    width: 30px;
    height: 30px;
  }

  &__body {
    padding: 10px 20px 10px;
    overflow: auto;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    background-color: white !important;
    color: black !important;
    border-radius: 3%;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
