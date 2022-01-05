<template>
  <div class="grid-x notes">
    <div class="cell small-6 medium-6 large-6 notes_content">
      <div class="notes_content_switch">
        <p v-on:click="displayDialy()" :class="[daily_display ? 'isDisplay' : 'isHide']"> Daily </p>
        <p> || </p>
        <p v-on:click="displayWeekly()" :class="[week_display ? 'isDisplay' : 'isHide']"> Weekly </p>
      </div>
      <div class="notes_content_daily">
        <i class="far fa-arrow-alt-circle-right" v-on:click="addByOneDay"></i>
        <p>
          <span>{{ date_in_words }}</span>
          <br>
          <span>{{ date_in_numbers }}</span>
        </p>
        <i class="far fa-arrow-alt-circle-left" v-on:click="reduceByOneDay"></i>
      </div>
      <div class="notes_content_form">
        <i class="fa fa-bars icon"></i>
        <input type="text" placeholder="Add a task" v-model="note" ref="noteRef">
        <button :class="[show_button ? 'isActive' : 'isNotActive']" v-on:click="addAToDo">
          Add
        </button>
      </div>
      <div>
        <vuetable ref="vuetable"
                  :row-class="onRowClass"
                  :css="css.table"
                  :fields="fields"
                  :api-mode="false"
                  :data="normal_notes"
                  pagination-path=""
                  noDataTemplate="No notes added">
        </vuetable>
      </div>
    </div>
    <div class="cell small-6 medium-6 large-6">
    </div>
  </div>
</template>


<script>

import moment from 'moment'
import {mapGetters} from 'vuex'
import axios from '../backend-api'
import Vuetable from './../../node_modules/vuetable-2/src/components/Vuetable'
import CssConfig from "../VuetableConfig";

export default {
  components: {
    Vuetable,
  },
  data() {
    return {
      css: CssConfig,
      note: "",
      week_display: false,
      daily_display: true,
      current_date: moment(),
      date_in_words: moment().format('dddd'),
      date_in_numbers: moment().format('MMM Do YY'),
      pinned_notes: [],
      normal_notes: [],
      fields: [
        {
          name: '__component:complete_task',
          title: '',
        },
        {
          name: 'task',
          title: '',
        },
        {
          name: '__component:custom_actions',
          title: '',
        },
      ],
    }
  },
  computed: {
    ...mapGetters(['getToken']),
    show_button: function () {
      return (this.note || this.note.length > 0);
    },
  },
  watch: {
    // current_date : () => {
    //   this.date_in_words = this.current_date.format('dddd');
    //   this.date_in_numbers = this.current_date.format('MMM Do YY')
    // }
  },
  methods: {
    async addAToDo() {
      await axios.post('/api/note', {"task": this.note}).then(
        async ({data}) => {
          if (data.status === 200) {
            this.$toast.success(`Adding a task was successful`);
            this.note = ''
            await this.getAllUserNotes();
          } else {
            this.$toast.error(`Adding of a task was unsuccessful`);
          }
        }).catch(({response: {data}}) => {
        this.$toast.error(`Adding of a task was unsuccessful`);
      })
    },
    displayDialy() {
      this.daily_display = true;
      this.week_display = false
    },
    displayWeekly() {
      this.daily_display = false;
      this.week_display = true
    },
    addByOneDay() {
      this.current_date = this.current_date.add(1, 'days');
      this.date_in_words = this.current_date.format('dddd')
      this.date_in_numbers = this.current_date.format('MMM Do YY')
    },
    reduceByOneDay() {
      this.current_date = this.current_date.subtract(1, 'days');
      this.date_in_words = this.current_date.format('dddd')
      this.date_in_numbers = this.current_date.format('MMM Do YY')
    },
    async getAllUserNotes() {
      axios.defaults.headers.authorization = `Bearer ${this.getToken}`
      await axios.get('/api/notes',
        {"task": this.note}).then(({data}) => {
        if (data.status === 200) {

          this.pinned_notes = data.data.filter(note => note.pinned === 1)
          this.normal_notes = data.data.filter(note => note.pinned === 0)

          //TODO This was useful in adding of a new variable to an object
          // let count = 0;
          // this.normal_notes.forEach((item) => {
          //   this.$set(item, 'itemIndex', count)
          //   this.$set(item, 'fieldIndex', count)
          //   count++
          // })

          console.log("Pinned notes " + this.pinned_notes[0])
          console.log("Normal notes " + this.normal_notes[0])

        } else {
          this.$toast.error(`Getting of data unsuccessful`);
        }
      }).catch(() => {
        this.$toast.error(`Getting of data unsuccessful`);
      })
    },
    onRowClass(dataItem, index) {
      return 'rowStyling';
    }
  },
  mounted() {
    this.getAllUserNotes()
    this.emitter.on("reload-table", () => {
      this.getAllUserNotes()
    })
  },
}
</script>

<style lang="scss">

.isActive {
  opacity: 1;
}

.isNotActive {
  opacity: 0.4;
}

.isHide {
  text-decoration: none;
}

.isDisplay {
  text-decoration: underline double red;
}

.rowStyling {
  text-align: left;
  background: #F1F5FE !important;
}

.vuetable-th-task {
  padding: 0 !important;
  background: #F1F5FE !important;
}

.vuetable-th-component-id {
  padding: 0 !important;
  background: #F1F5FE !important;
}

.vuetable-body {
  border: none !important;
}
</style>
