import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home/Home'
import User from '@/components/User/User'
import Login from '@/components/User/Login'
import Setting from '@/components/User/Setting'
import Readme from '@/components/User/Readme'
import Info from '@/components/User/Info'
import SongPlay from '@/components/SongPlay/SongPlay'
import Search from '@/components/Search/Search'
import SearchSongPlay from '@/components/Search/SearchSongPlay'
Vue.use(Router)
export default new Router({
  routes: [{
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home
  }, {
    path: '/user',
    component: User
  }, {
    path: '/login',
    component: Login
  }, {
    path: '/setting',
    component: Setting
  }, {
    path: '/readme',
    component: Readme
  }, {
    path: '/info',
    component: Info
  }, {
    path: '/songplay',
    component: SongPlay
  }, {
    path: '/search',
    component: Search
  }, {
    path: '/searchsongplay',
    component: SearchSongPlay
  }]
})
