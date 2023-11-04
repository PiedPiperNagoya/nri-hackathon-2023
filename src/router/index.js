import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from '../views/Auth/SignupView'
import SigninView from '../views/Auth/SigninView'
import MypageView from '../views/MypageView'
import CreatePlanView from '../views/CreatePlanView'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomeView,
  },
  {
    path: '/signup',
    name: 'Signup',
    component: SignupView,
  },
  {
    path: '/signin',
    name: 'Signin',
    component: SigninView,
  },
  {
    path: '/mypage',
    name: 'Mypage',
    component: MypageView,
  },
  {
    path: '/mypage/new',
    name: 'CreatePlan',
    component: CreatePlanView,
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
