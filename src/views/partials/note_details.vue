<template>
  <div>
    <div class="flex-container" style="margin-top: 10px">
      <p>{{ rowData.task }}
        <br>
        <span> {{ rowData.memo }} </span>
      </p>
    </div>
  </div>
</template>

<script>

import axios from '../../backend-api'
import {mapGetters} from 'vuex'

export default {
  name: 'note_details',
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
  },
  mounted() {
  }
}
</script>

<style lang="scss" scoped>

p{
  font-weight: bolder;

}

span{
  font-weight: normal;
}
</style>

