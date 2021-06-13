import Vue from 'vue'
import VueRouter from 'vue-router'
import foundIndex from '@/views/home/home'
import topDetail from '@/views/topDetail/index'
import topSongs from '@/views/topSongs/index'
import search from '@/views/search/index'
import searchSong from '@/views/searchDeail/index.vue'
import choose from '@/views/dengLu/index.vue'
import tel from '@/views/dengLu/tel.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/', // 首页
    name: 'foundIndex',
    component: foundIndex
  }, {
    path: '/choose',
    name: 'choose',
    component: choose
  }, {
    path: '/tel',
    name: 'tel',
    component: tel
  }, {
    path: '/topSongs', // 排行榜页
    name: 'topSongs',
    component: topSongs
  }, {
    path: '/topDetail/:name', // 榜单详情页动态路由
    name: 'topDetail',
    component: topDetail
  }, {
    path: '/search', // 搜索页面
    name: 'search',
    component: search
  }, {
    path: '/searchSong/:name', // 搜索详情页
    name: 'searchSong',
    component: searchSong
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
