import Vue from 'vue'
import VueRouter from 'vue-router'
import foundIndex from '@/views/home/home'
import songList from '@/views/songList/songList'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'foundIndex',
    component: foundIndex
  }, {
    path: '/songList',
    name: 'songList',
    component: songList
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
