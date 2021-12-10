import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Toaster from '@meforma/vue-toaster';

// component had to be registred globally for it to work
import custom_actions from './views/partials/custom_actions'

import VueSidebarMenu from 'vue-sidebar-menu'

import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

require('./assets/sass/app.scss')

createApp(App).use(AOS.init()).use(Toaster).use(VueSidebarMenu).use(store).use(router).component("custom_actions", custom_actions).mount('#app')
