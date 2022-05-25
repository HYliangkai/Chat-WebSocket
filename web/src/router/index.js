import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  // 小tips:设置二级路由的时候一级路由不能有名字
  { path:'/main',
    component:()=>import('../views/main.vue'),
    children: [
      { path:'/',
        name:'defalut',
      component:()=>import('../views/defalut.vue')},
      {
        path: '/chat/:accept',
        name: 'chat',
        component: () => import('../views/chat.vue'),
        props: true
      },
    ]
},
]

const router = new VueRouter({
  routes
})

export default router
