import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Admin from '@/components/Admin'
import Login from '@/components/Login'
import H5 from '@/pages/H5'
import H5List from '@/pages/H5List'
// import EditH5 from '@/pages/EditH5'
import Customer from '@/pages/Customer'
import Developer from '@/pages/Developer'
import Service from '@/pages/Service'
import Type from '@/pages/Type'

Vue.use(Router)
const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path:'/admin',
      name:'Admin',
      meta:{
        requireAuth:true
      },
      component:Admin,
      children:[
        {path:'',name:'H5List',component:H5List},
        {path:'addH5',name:'H5',component:H5},
        {path:'editH5/:h5Form',name:'EditH5',component:H5,props: true},
        {path:'customer',name:'Customer',component:Customer},
        {path:'developer',name:'Developer',component:Developer},
        {path:'service',name:'Service',component:Service},
        {path:'type',name:'Type',component:Type}
      ]
    }
  ]
});
router.beforeEach((to,from,next)=>{
  if(to.matched.some(res=>res.meta.requireAuth)){
    if(localStorage.userInfo){
      next();
    }else{
      next({
        path:'/login',
        query:{redirect:to.fullPath}
      });
    }
  }else{
    next();
  }
});
export default router;
