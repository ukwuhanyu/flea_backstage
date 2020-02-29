import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Menu from '@/components/Menu/Menu'
import Login from '@/components/Login/Login'
import Admin from '@/components/Admin/Admin'
import Carousel from '@/components/Carousel/Carousel'
import AboutMe from '@/components/AboutMe/AboutMe'
import Category from '@/components/Category/Category'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        // {
        //   path: '/menu',
        //   name: '菜单编辑',
        //   component: Menu
        // },
        {
          path: '/admin',
          name: '管理员编辑',
          component: Admin
        },
        {
          path: '/carousel',
          name: '轮播图管理',
          component: Carousel
        },
        {
          path: '/aboutme',
          name: '关于我',
          component: AboutMe
        },
        {
          path: '/category',
          name: '分类管理',
          component: Category
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
