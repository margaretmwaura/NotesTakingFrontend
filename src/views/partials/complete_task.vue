<template>
  <div>
    <input
      type="checkbox"
      v-model="checked"
      true-value="1"
      false-value="0"
      @change="completeTask($event)"
    />
  </div>
</template>

<script>

import axios from '../../backend-api'
import {mapGetters} from 'vuex'

export default {
  name: 'complete_task',
  data() {
    return {
      checked: this.rowData.complete
    }
  },
  computed: {
    ...mapGetters(['getToken']),
  },
  props: {
    rowData: {
      type: Object,
      required: true
    },
    rowIndex: {
      type: Number
    }
  },
  methods: {
    async completeTask(e) {
      axios.defaults.headers.authorization = `Bearer ${this.getToken}`
      await axios.post('/api/complete_task', {"task_id": this.rowData.id, "complete": this.checked}
      ).then(
        async ({data}) => {
          if (data.status === 200) {
            if (parseInt(this.checked) === 0) {
              this.$toast.success(`Task was successfully marked incomplete`);
              this.emitter.emit("reload-table");
            } else {
              this.$toast.success(`Task was successfully marked complete`);
              this.emitter.emit("reload-table");
            }
          } else {
            this.$toast.error(`An error was encountered`);
          }
        }).catch(({}) => {
        this.$toast.error(`An error was encountered`);
      })
    },
  },
  mounted() {
    console.log(this.rowData.complete)
  }
}
</script>

