import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Toaster from '@meforma/vue-toaster';
import upperFirst from 'lodash/upperFirst'
import camelCase from 'lodash/camelCase'
// component had to be registred globally for it to work

import VueSidebarMenu from 'vue-sidebar-menu'

import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import mitt from 'mitt';
const emitter = mitt();

require('./assets/sass/app.scss')

const app = createApp(App)

const requireComponent = require.context(
  // The relative path of the components folder
  './views/partials',
  // Whether or not to look in subfolders
  true,
  // The regular expression used to match base component filenames
  /.vue$/,
)

requireComponent.keys().forEach(fileName => {
  // Get component config
  const componentConfig = requireComponent(fileName)

  // Get PascalCase name of component
  const componentName = fileName
    .replace('./', '')
    // Remove the file extension from the end
    .replace(/\.\w+$/, '')

  console.log("The component name is " + componentName)
  app.component(
    componentName,
    // Look for the component options on `.default`, which will
    // exist if the component was exported with `export default`,
    // otherwise fall back to module's root.
    componentConfig.default || componentConfig
  )
})

app.config.globalProperties.emitter = emitter;

app.use(AOS.init())
  .use(Toaster)
  .use(VueSidebarMenu)
  .use(store)
  .use(router)
  .mount('#app')
