import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // 小tips:设置二级路由的时候一级路由不能有名字
  { path:'/main',
    component:()=>import('../views/main.vue'),
    children: []
},
]

const router = new VueRouter({
  routes
})

export default router
