<template>
  <div>
    <button @click="edit" id="button"><i class="fa fa-ellipsis-h"></i></button>
    <modal ref="modalName">
      <template v-slot:body>
        <p><i class="fa fa-thumb-tack" aria-hidden="true"></i> Pin to the top</p>
        <p><i class="fa fa-plus" aria-hidden="true"></i> Add a memo</p>
        <p><i class="fa fa-trash" aria-hidden="true"></i> Delete</p>
      </template>

    </modal>

  </div>
</template>

<script>
import axios from 'axios';
// import eventBus from "../../eventBus";
import modal from "./modal";
export default {
  name: 'custom_actions',
  components: {
    modal
  },
  props: {
    rowData: {
        type : Object,
        required: true
    },
    rowIndex: {
        type: Number
    }
  },
  methods: {
    edit() {
      this.$refs.modalName.openModal()
      // let el = document.getElementById('button');
      // var elDistanceToTop = window.pageYOffset + el.getBoundingClientRect().top
      // console.log("The distance is " + elDistanceToTop);
    },
    // TODO this function is difinately not going to be called this
    deleteRow() {
      // this.$refs.modalName.closeModal();
    },
  },
  mounted(){

  }

}
</script>

