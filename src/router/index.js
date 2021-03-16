import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/home/Home'
import Login from '../views/login/Login'

const routes = [{
  path: '/',
  name: 'Home',
  component: Home
}, {
  path: '/login',
  name: 'Login',
  component: Login,
  beforeEnter: (to, from, next) => {
    // 路由校验，在加载页面前校验，如果已经登陆了，就路由指向首页
    const { isLogin } = localStorage
    isLogin ? next({ name: 'Home' }) : next() // next({ name: 'Home' }) 将路由指向Home
  }
}
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// 路由校验，如果没有登陆，路由就指向登陆页
router.beforeEach((to, from, next) => {
  const { isLogin } = localStorage;
  (isLogin || to.name === 'Login') ? next() : next({ name: 'Login' })
})

export default router
