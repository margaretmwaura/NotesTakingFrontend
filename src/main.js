import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos'
import 'aos/dist/aos.css'

require('./assets/sass/app.scss')

// new Vue({
//   created () {
//     AOS.init()
//   },
//   render: h => h(App),
// }).$mount('#app');

// TODO must sort this to accommodate for the function
createApp(App).use(AOS.init()).use(store).use(router).mount('#app')
