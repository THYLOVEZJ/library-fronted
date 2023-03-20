import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/user',
        name: 'User',
        component: () => import('@/views/user/User')
    },
    {
        path: '/addUser',
        name: 'AddUser',
        component: () => import('@/views/user/addUser')
    },
    {
        path: '/editUser',
        name: 'editUser',
        component: () => import('@/views/user/editUser')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
