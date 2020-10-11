import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'IndexUsers',
    component: require('@/pages/IndexUsers.vue').default,
     meta: {
      title: 'About Page - Example App',
    }
  },
  {
    path: '/cadastro',
    name: 'CreateUser',
    component: require('@/pages/CreateUser.vue').default
  },
  {
    path: '/cadastro/:id',
    name: 'UpdateUser',
    component: require('@/pages/UpdateUser.vue').default
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
