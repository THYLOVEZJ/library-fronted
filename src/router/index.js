import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../views/Layout'
import Cookies from "js-cookie";

Vue.use(VueRouter)

const routes = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/views/login/Login')
    },
    // 主页
    {
        path: '/',
        name: 'Layout',
        component: Layout,
        redirect: '/home',
        children: [
            {
                path: 'home',
                name: 'Home',
                component: () => import('@/views/home/Home')
            },
            // user
            {
                path: 'user',
                name: 'User',
                component: () => import('@/views/user/User')
            },
            {
                path: 'addUser',
                name: 'AddUser',
                component: () => import('@/views/user/addUser')
            },
            {
                path: 'editUser',
                name: 'editUser',
                component: () => import('@/views/user/editUser')
            },
            // admin
            {
                path: 'admin',
                name: 'Admin',
                component: () => import('@/views/admin/Admin')
            },
            {
                path: 'addAdmin',
                name: 'AddAdmin',
                component: () => import('@/views/admin/addAdmin')
            },
            {
                path: 'editadmin',
                name: 'editAdmin',
                component: () => import('@/views/admin/editAdmin')
            }
        ]
    },
    {
        path: "*",
        component: () => import('@/views/user/404')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to,from,next)=>{
    if (to.path === '/login') next()
    const admin = Cookies.get("admin")
    if (!admin && to.path !== '/login') return next('/login')
    next()
})

export default router
