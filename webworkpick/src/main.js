// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
// 重置样式
import './assets/css/reset.css'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
Vue.prototype.$axios = axios
Vue.use(ElementUI);
Vue.config.productionTip = false

// 全局路由守卫
router.beforeEach((to, from, next) => {
  if(to.path == '/login' || to.path == '/register'){
    next();
  }else{
    console.log(sessionStorage.getItem('token'),8888)
    if(sessionStorage.getItem('token')){
      next()
    }else{
      alert('您还没有登录，请先登录');
      next('/login');
    }

  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
