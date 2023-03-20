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
    // user
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
    },
    // admin
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('@/views/admin/Admin')
    },
    {
        path: '/addAdmin',
        name: 'AddAdmin',
        component: () => import('@/views/admin/addAdmin')
    },
    {
        path: '/editadmin',
        name: 'editAdmin',
        component: () => import('@/views/admin/editAdmin')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
