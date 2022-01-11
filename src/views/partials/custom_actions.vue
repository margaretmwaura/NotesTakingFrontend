<template>
  <div>
    <button @click="edit" id="button"><i class="fa fa-ellipsis-h"></i></button>
    <modal ref="modalName">
      <template v-slot:body>
        <div v-if="rowData.pinned === 1">
          <p @click="pinTask(0)"><img src="../../assets/images/pin.png"/> UnPin from top</p>
        </div>
        <div v-else>
          <p @click="pinTask(1)"><i class="fa fa-thumb-tack" aria-hidden="true"></i> Pin to the top</p>
        </div>
        <div v-if="rowData.memo">
          <p @click="openMemoModal"><i class="fa fa-edit" aria-hidden="true"></i> Edit memo</p>
        </div>
        <div v-else>
          <p @click="openMemoModal"><i class="fa fa-plus" aria-hidden="true"></i> Add memo</p>
        </div>
        <p><i class="fa fa-trash" aria-hidden="true"></i> Delete</p>
      </template>
    </modal>
    <elavated_modal ref="add_a_memo">
      <template v-slot:body>
        <p>Add A Memo</p>
        <textarea type="text" rows="2" v-model="memo"/>
        <div class="flex">
          <button class="button" @click="addAMemo">{{action}}
          </button>
          <button class="button" @click="close_modal">
            Cancel
          </button>
        </div>
      </template>
    </elavated_modal>
  </div>
</template>

<script>
import modal from "./modal";
import elavated_modal from "./elavated_modal"
import axios from '../../backend-api'
import {mapGetters} from 'vuex'

export default {
  name: 'custom_actions',
  components: {
    modal,
    elavated_modal
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
  data() {
    return {
      memo: this.rowData.memo,
      action : this.rowData.memo ? "Edit Memo" : "Add Memo"
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
    deleteTask() {
      // this.$refs.modalName.closeModal();
    },
    openMemoModal() {
      this.$refs.add_a_memo.openModal()
    },
    async addAMemo() {
      axios.defaults.headers.authorization = `Bearer ${this.getToken}`
      await axios.post(`/api/note/${this.rowData.id}/memo`, {"memo": this.memo}).then(
        async ({data}) => {
          if (data.status === 200) {
            this.$toast.success(`Memo added successfully`);
            this.emitter.emit("reload-table");
          } else {
            this.$toast.error(`There was a problem adding the memo`);
          }
          this.$refs.add_a_memo.closeModal()
        }).catch(({response: {data}}) => {
        this.$toast.error(`There was a problem adding the memo`);
        this.$refs.add_a_memo.closeModal()
      })
    },
    async pinTask(pin_value) {
      axios.defaults.headers.authorization = `Bearer ${this.getToken}`
      await axios.post(`/api/note/${this.rowData.id}/pinNote`, {"pin_value": pin_value}).then(
        async ({data}) => {
          if (data.status === 200) {
            this.$toast.success(`Task has successfully being pinned`);
            this.emitter.emit("reload-table");
          } else {
            this.$toast.error(`Pinning of a task was unsuccessful`);
          }
        }).catch(({response: {data}}) => {
        this.$toast.error(`Pinning of a task was unsuccessful`);
      })
    },
    close_modal() {
      this.$refs.add_a_memo.closeModal()
    }
  },
  mounted() {
  }

}
</script>

<style lang="scss" scoped>
@import "./src/assets/sass/colors.scss";

.button {
  background: $dark_purple;
  font-size: 16px;
  font-weight: bolder;
  border-radius: 5px;
  color: white;
  margin-left: 2%;
}

textarea {
  background-color: $dark_purple !important;
  color: white;
}

img {
  height: 15px;
  width: 15px;
}
</style>

