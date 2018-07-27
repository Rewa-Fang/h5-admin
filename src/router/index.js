import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Admin from '@/components/Admin'
import H5 from '@/pages/H5'
import H5List from '@/pages/H5List'
import Customer from '@/pages/Customer'
import Developer from '@/pages/Developer'
import Service from '@/pages/Service'
import Type from '@/pages/Type'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path:'/admin',
      name:'Admin',
      component:Admin,
      children:[
        {path:'h5',name:'H5List',component:H5List},
        {path:'addH5',name:'H5',component:H5},
        {path:'customer',name:'Customer',component:Customer},
        {path:'developer',name:'Developer',component:Developer},
        {path:'service',name:'Service',component:Service},
        {path:'type',name:'Type',component:Type}
      ]
    }
  ]
})
