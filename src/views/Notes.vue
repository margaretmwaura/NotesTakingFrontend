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

export default {
  data() {
    return {
      note: ""
    }
  },
  computed: {
    show_button: function () {
      return (this.note || this.note.length > 0);
    }
  },
  mounted(){
    this.$refs.noteRef.blur()
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
