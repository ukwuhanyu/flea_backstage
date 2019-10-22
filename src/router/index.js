import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Menu from '@/components/Menu/Menu'
import Login from '@/components/Login/Login'
import Admin from '@/components/Admin/Admin'
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children: [
        {
          path: '/menu',
          name: '菜单编辑',
          component: Menu
        },
        {
          path: '/admin',
          name: '管理员编辑',
          component: Admin
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
