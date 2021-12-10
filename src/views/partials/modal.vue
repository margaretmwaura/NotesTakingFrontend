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
  name: "Modal",
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
  }

  &__dialog {
    position: absolute;
    width: 200px;
    display: flex;
    flex-direction: column;
    border-radius: 5px;
    z-index: 2;
    left: -220%;
    @media screen and (max-width: 992px) {
      width: 90%;
    }
  }

  &__dialog::after {
    content: " ";
    position: absolute;
    bottom: 100%;  /* At the top of the tooltip */
    left: 83%;
    //margin-left: -5px;
    border-width: 5px;
    border-style: solid;
    border-color: transparent transparent $main_color transparent;
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
    background-color: $main_color !important;
    color: white !important;
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
