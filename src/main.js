import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Toaster from '@meforma/vue-toaster';

import VueSidebarMenu from 'vue-sidebar-menu'

import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

require('./assets/sass/app.scss')

createApp(App).use(AOS.init()).use(Toaster).use(VueSidebarMenu).use(store).use(router).mount('#app')
