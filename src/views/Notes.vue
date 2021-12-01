<template>
  <div class="grid-x notes">
    <div class="cell small-6 medium-6 large-6 notes_content">
      <div class="notes_content_form">
        <i class="fa fa-bars icon"></i>
        <input type="text" placeholder="Add a task" v-model="note" ref="noteRef">
        <button :class="[show_button ? 'isActive' : 'isNotActive']">
          Add
        </button>
      </div>
    </div>
    <div class="cell small-6 medium-6 large-6">
    </div>
  </div>
</template>


<script>

import {mapGetters} from 'vuex'
import axios from '../backend-api'

export default {
  data() {
    return {
      note: ""
    }
  },
  computed: {
    ...mapGetters(['getToken']),
    show_button: function () {
      return (this.note || this.note.length > 0);
    }
  },
  methods:{
    async addAToDo (){
      axios.get('/api/add_a_task', { "note" : this.note}).then(({data}) => {
        this.$toast.success(`Adding a task was successful`);
      }).catch(({response: {data}}) => {
        this.$toast.error(`Adding of a task was unsuccessful`);
      })
    },
  },
  mounted(){
  }
}
</script>

<style lang="scss">

.isActive {
  opacity: 1;
}

.isNotActive {
  opacity: 0.4;
}
</style>
