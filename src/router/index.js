import {createRouter, createWebHistory} from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      middleware: "guest"
    },
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
    meta: {
      middleware: "auth"
    },
  },
  {
    path: '/signup',
    name: 'Signup',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Signup.vue'),
    meta: {
      middleware: "guest",
    }
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: () => import(/* webpackChunkName: "about" */ '../views/Dashboard.vue'),
    meta: {
      middleware: ["auth", "verified"]
    },
    children: []
  },
  {
    // UserProfile will be rendered inside User's <router-view>
    // when /user/:id/profile is matched
    path: '/notes/:authenticatedBackend',
    name: 'Notes',
    component: () => import(/* webpackChunkName: "about" */ '../views/Notes.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach(async (to, from, next) => {
  document.title = `${to.meta.title}`

  if (to.meta.middleware == "guest") {
    if (store.state.authenticated) {
      // TODO configure this to a route that one can visit if they are authenticated but that route is for guests
      // next({name:"About"})
    }
    next()
  } else {

    if (to.params.authenticatedBackend) {
      console.log("Getting user")
      await store.dispatch('current_user')
    }

    console.log("Authentication status " + store.state.authenticated)

    if (store.state.authenticated && store.state.user.email_verified_at) {
        console.log("They is clear")
        next()
      } else {
       console.log("Sorry you have to login")
        next({name: "Signup"})
      }
    }
  })

export default router
