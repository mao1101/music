import Vue from 'vue'
import VueRouter from 'vue-router'
import foundIndex from '@/views/home/home'
import topDetail from '@/views/topDetail/index'
import topSongs from '@/views/topSongs/index'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 首页
    name: 'foundIndex',
    component: foundIndex
  }, {
    path: '/topSongs', // 排行榜页
    name: 'topSongs',
    component: topSongs
  }, {
    path: '/topDetail/:name', // 榜单详情页动态路由
    name: 'topDetail',
    component: topDetail
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
