<template>
  <div>
    <div id="view" :class="{'collapsed' : collapsed}" class="dashboard grid-x">
      <div class="dashboard_topbar cell small-12 medium-12 large-12">
        <img src="../assets/images/delivery-man.svg">
        <div v-on:click="showLogoutIcon" class="dashboard_topbar_dropdown"><i class="fa fa-caret-down"></i></div>
      </div>
      <div class="dashboard_logout cell small-1 medium-1 large-1" v-show="showLogout">
        <p v-on:click="logOut">Log out</p>
      </div>
      <router-view>
      </router-view>
    </div>
    <sidebar-menu
      class="sidebar"
      :menu="menu"
      :collapsed="collapsed"
      @item-click="onItemClick"
      @toggle-collapse="onCollapse"
    />
  </div>
</template>

<script>
import axios from 'axios'
import {mapGetters} from 'vuex'
axios.defaults.withCredentials = true;
axios.defaults.baseURL = "http://localhost:8400"

export default {
  data() {
    return {
      menu: [
        {
          header: "Notes",
          hiddenOnCollapse: true
        },
        {
          href: '/notes',
          title: 'Notes',
          icon: 'fa fa-edit'
        },
      ],
      collapsed: true,
      showLogout: false
    }
  },
  computed: {
    ...mapGetters(['getToken'])
  },
  methods: {
    onItemClick(e, i) {
    },
    onCollapse(c) {
      this.collapsed = c;
    },
    showLogoutIcon() {
      if (this.showLogout === false) {
        this.showLogout = true
      } else {
        this.showLogout = false
      }
    },
    async logOut() {
      await axios.post('logout',{
        headers: {
          'Authorization': `Bearer ${this.getToken}`
        },
      }).then(({data}) => {
        if (data.status === 200) {
          this.$toast.success(`Logout was successful`);
          this.$store.dispatch('logout')
          this.$router.push({name: 'Home'})
        } else {
          this.$toast.error(`Logout failed`);
        }
      }, () => {
        this.$toast.error(`Logout failed`);
      })
    }
  },
  mounted() {
    this.$router.push({name: 'Notes'})
  },
  created() {
    this.$router.push({name: 'Notes'})
  }
}
</script>

<style scoped lang="scss">
#view {
  padding-left: 350px;
}

#view.collapsed {
  padding-left: 50px;
}
</style>
