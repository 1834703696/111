import {createRouter,createWebHistory,RouteRecordRaw} from 'vue-router'

const routes:RouteRecordRaw[] = [
    {
      path:'/',
      name:'home',
      component:()=>import('../view/home/HomeView.vue'),
      children:[
         {
           path:'/goods',
           meta:{
            title:"商品列表",
            flag:true
           },
           name:'goods',
           component:()=>import('../view/goods/GoodView.vue')
         },
         {
           path:'/user',
           meta:{
            title:"用户列表",
            flag:true
           },
           name:'user',
           component:()=>import('../view/user/userView.vue')
         },
         {
           path:'/role',
           meta:{
            title:"角色列表",
            flag:true
           },
           name:'role',
           component:()=>import('../view/Role/RoleView.vue')
         },
         {
           path:'/power',
           meta:{
            title:"权限列表",
            flag:false
           },
           name:'power',
           component:()=>import('../view/Power/PowerView.vue')
         },
      ]
},
    {
      path:'/login',
      name:'login',
      component:()=>import('../view/login/LoginView.vue')
},
]



const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router