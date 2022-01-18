<template>
  <div class="grid-x notes">
    <div class="cell small-6 medium-6 large-6 notes_content">
      <div class="notes_content_switch">
        <p v-on:click="displayDialy()" :class="[daily_display ? 'isDisplay' : 'isHide']"> Daily </p>
        <p> || </p>
        <p v-on:click="displayWeekly()" :class="[week_display ? 'isDisplay' : 'isHide']"> Weekly </p>
      </div>
      <div class="notes_content_daily" v-if="daily_display">
        <i class="far fa-arrow-alt-circle-right" v-on:click="addByOneDay"></i>
        <p>
          <span>{{ date_in_words }}</span>
          <br>
          <span>{{ date_in_numbers }}</span>
        </p>
        <i class="far fa-arrow-alt-circle-left" v-on:click="reduceByOneDay" v-if="loadMore"></i>
      </div>
      <div class="notes_content_daily" v-if="week_display">
        <i class="far fa-arrow-alt-circle-right" v-on:click="addByOneWeek"></i>
        <p>
          <span>{{ moment(start_of_week).format('DD-MM-YY') }} - {{ moment(end_of_week).format('DD-MM-YY') }}</span>
          <br>
          <span>
            {{ moment(start_of_week).format('dddd') }}  - {{ moment(end_of_week).format('dddd') }}
          </span>
        </p>
        <i class="far fa-arrow-alt-circle-left" v-on:click="reduceByOneWeek" v-if="loadMore"></i>
      </div>
      <div class="notes_content_form">
        <i class="fa fa-bars icon"></i>
        <input type="text" placeholder="Add a task" v-model="note" ref="noteRef">
        <button :class="[show_button ? 'isActive' : 'isNotActive']" v-on:click="addAToDo">
          Add
        </button>
      </div>
      <div v-if="week_display">
        <div v-for="(grouped_notes, date) in weekly_notes" class="notes_content_table">
          <div class="notes_content_table_title"><p>{{ moment(date, 'DD-MM-YY').format('dddd') }}</p></div>
          <div v-for="nested_notes in grouped_notes">
            <vuetable ref="vuetable"
                      :row-class="onRowClass"
                      :css="css.table"
                      :fields="fields"
                      :api-mode="false"
                      :data="nested_notes"
                      pagination-path=""
                      track-by="id"
                      noDataTemplate="No notes added">
              <!--            TODO check on how to use the slots in vuejs -->
              <!--            <div slot="details" slot-scope="props">-->
              <!--&lt;!&ndash;              <p>{{props}}</p>&ndash;&gt;-->
              <!--              <p>maggie</p>-->
              <!--&lt;!&ndash;              <span style="font-weight: bolder">{{ props.rowData.task }}</span>&ndash;&gt;-->
              <!--&lt;!&ndash;              <span style="font-weight: normal">{{ props.rowData.created_at }}</span>&ndash;&gt;-->
              <!--            </div>-->
            </vuetable>
          </div>
        </div>
        <div v-if="weekly_notes.length === 0">
          <p>You do not have notes for the said period of time</p>
        </div>
      </div>
      <div v-if="daily_display">
        <div v-for="grouped_notes in daily_notes" class="notes_content_table">
          <vuetable ref="vuetable"
                    :row-class="onRowClass"
                    :css="css.table"
                    :fields="fields"
                    :api-mode="false"
                    :data="grouped_notes"
                    pagination-path=""
                    track-by="id"
                    noDataTemplate="No notes added">
          </vuetable>
        </div>
        <div v-if="daily_notes.length === 0">
          <p>You do not have notes for the said period of time</p>
        </div>
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
      note : "",
      weekly_notes: [],
      daily_notes: [],
      week_display: false,
      daily_display: true,
      moment: moment,
      current_date: moment(),
      date_in_words: moment().format('dddd'),
      date_in_numbers: moment().format('MMM Do YY'),
      start_of_week: moment().startOf('week'),
      end_of_week: moment().endOf('week'),
      fields: [
        {
          name: '__component:complete_task',
          title: '',
          width: '70px',
        },
        {
          name: '__component:note_details',
          // name: '__slot:details',
          title: '',
          width: '75%',
        },
        {
          name: '__component:custom_actions',
          title: '',
        },
      ],
      firstRecordDate: moment(),
      loadMore: true
    }
  },
  computed: {
    ...mapGetters(['getToken']),
    show_button: function () {
      return (this.note || this.note.length > 0);
    },
  },
  watch: {
    // loadMore() {
    //   if(this.loadMore){
    //     this.getAllUserNotes();
    //   }
    // }
  },
  methods: {
    async addAToDo() {
      await axios.post('/api/note', {"task": this.note}).then(
        async ({data}) => {
          if (data.status === 200) {
            this.$toast.success(`Adding a task was successful`);
            this.note = ''
            await this.getAllUserWeeklyNotes();
            await this.getAllUserDailyNotes();
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
      this.loadMoreRecords();
    },
    reduceByOneDay() {
      this.current_date = this.current_date.subtract(1, 'days');
      this.date_in_words = this.current_date.format('dddd')
      this.date_in_numbers = this.current_date.format('MMM Do YY')
      this.loadMoreRecords();
    },
    addByOneWeek() {
      this.start_of_week = this.start_of_week.add(7, 'days');
      this.end_of_week = this.end_of_week.add(7, 'days');
      this.loadMoreRecords();
    },
    reduceByOneWeek() {
      this.start_of_week = this.start_of_week.subtract(7, 'days');
      this.end_of_week = this.end_of_week.subtract(7, 'days');
      this.loadMoreRecords();
    },
    async getAllUserWeeklyNotes() {
      axios.defaults.headers.authorization = `Bearer ${this.getToken}`
      await axios.get(`/api/notes/${this.start_of_week}/${this.end_of_week}`).then(({data}) => {
        if (data.status === 200) {
          this.weekly_notes = data.data
          // TODO ... this was useful when the data was coming not grouped
          // this.pinned_notes = [];
          // this.pinned_notes = data.data.filter(note => note.pinned === 1)
          // this.normal_notes = [];
          // this.normal_notes = data.data.filter(note => note.pinned === 0)

          //TODO This was useful in adding of a new variable to an object
          // let count = 0;
          // this.normal_notes.forEach((item) => {
          //   this.$set(item, 'itemIndex', count)
          //   this.$set(item, 'fieldIndex', count)
          //   count++
          // })
        } else {
          this.$toast.error(`Getting of data unsuccessful`);
        }
      }).catch(() => {
        this.$toast.error(`Getting of data unsuccessful`);
      })
    },
    async getAllUserDailyNotes() {
      axios.defaults.headers.authorization = `Bearer ${this.getToken}`
      await axios.get(`/api/notes/${this.current_date}`).then(({data}) => {
        if (data.status === 200) {
          this.daily_notes = data.data
          // TODO ... this was useful when the data was coming not grouped
          // this.pinned_notes = [];
          // this.pinned_notes = data.data.filter(note => note.pinned === 1)
          // this.normal_notes = [];
          // this.normal_notes = data.data.filter(note => note.pinned === 0)

          //TODO This was useful in adding of a new variable to an object
          // let count = 0;
          // this.normal_notes.forEach((item) => {
          //   this.$set(item, 'itemIndex', count)
          //   this.$set(item, 'fieldIndex', count)
          //   count++
          // })
        } else {
          this.$toast.error(`Getting of data unsuccessful`);
        }
      }).catch(() => {
        this.$toast.error(`Getting of data unsuccessful`);
      })
    },
    onRowClass(dataItem, index) {
      return 'rowStyling';
    },
    async getTheOldestNote() {
      axios.defaults.headers.authorization = `Bearer ${this.getToken}`
      await axios.get('/api/oldest_task').then(({data}) => {
        if (data.status === 200) {
          this.firstRecordDate = data.data.created_at
          console.log(data.data.created_at)
          this.loadMoreRecords()
        } else {
          this.$toast.error(`Getting of note unsuccessful`);
        }
      }).catch(() => {
        this.$toast.error(`Getting of note unsuccessful`);
      })
    },
    loadMoreRecords() {

      if (this.daily_display) {

        if (this.current_date.isSame(moment(this.firstRecordDate), 'day')) {
          this.loadMore = false;
          return;
        } else if (this.current_date.isAfter(moment(this.firstRecordDate))) {
          this.loadMore = true;
        } else {
          this.loadMore = false;
        }
        this.getAllUserDailyNotes();
      }

      if(this.week_display){

        if (this.start_of_week.isSame(moment(this.firstRecordDate), 'day')) {
          this.loadMore = false;
          return;
        } else if (this.start_of_week.isAfter(moment(this.firstRecordDate))) {
          this.loadMore = true;
        } else {
          this.loadMore = false;
        }
        this.getAllUserWeeklyNotes();
      }

    }
  },
  mounted() {
    this.getAllUserDailyNotes()
    this.getAllUserWeeklyNotes()
    this.getTheOldestNote()
    this.emitter.on("reload-table", () => {
      this.getAllUserDailyNotes()
      this.getAllUserWeeklyNotes()
      console.log("Reload")
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

.vuetable-empty-result {
  padding: 0 !important;
  background: #F1F5FE !important;
}
</style>
