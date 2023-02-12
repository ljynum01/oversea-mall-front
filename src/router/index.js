import { createRouter, createWebHistory } from 'vue-router'
import ShoppingMall from "../consumer/ShoppingMall"
import A from '../views/A.vue'
import B from '../views/B.vue'
import C from '../views/C.vue'

import Type from "../consumer/Type"
import MyOrders from "../consumer/MyOrders"
import Myself from "../consumer/Myself"
import Details from "../consumer/Details"
// import test from "../consumer/test"
// import CommentPage from "../consumer/CommentPage"

import Login from "../views/Login"
import Register from "../views/Register"
import Merchant from "../views/Merchant"
import Lookmyself from '../views/Lookmyself'
import Changemyself from '../views/Changemyself'
import Goods from '../views/Goods'
import AddGoods from '../views/AddGoods'
import Income from '../views/Income'
import ConsumerInfo from '../views/ConsumerInfo'
import MerchantInfo from '../views/MerchantInfo'
import Order from '../views/Order'
import Orderfailing from '../views/Orderfailing'
import Ordersucceed from '../views/Ordersucceed'
import ReturnOrder from '../views/ReturnOrder'
import Comment from '../views/Comment'

const routes = [
  {
    path: "/navigation",
    name: "个人中心",
    component: Merchant,
    meta: {"role": ['admin','merchant']},
    redirect:"/Lookmyself",
    children: [
      {
        path: "/Lookmyself",
        name: "查看个人信息",
        component: Lookmyself,
        meta: {"role": ['admin','merchant']}
      },
      {
        path: "/Changemyself",
        name: "修改个人信息",
        component: Changemyself,
        meta: {"role": ['merchant']}
      }
    ]
  },
  {
    path: "/navigation",
    name: "商品管理",
    component: Merchant,
    meta: {"role": ['admin','merchant']},
    children: [
      {
        path: "/Goods",
        name: "查看商品信息",
        component: Goods,
        meta: {"role": ['admin','merchant']}
      },
      {
        path: "/AddGoods",
        name: "上架商品",
        component: AddGoods,
        meta: {"role": ['merchant']}
      }
    ]
  },
  {
    path: "/navigation",
    name: "收益统计",
    component: Merchant,
    meta: {"role": ['merchant']},
    children: [
      // {
      //   path: "/Invoicing",
      //   name: "进销记录",
      //   component: Invoicing,
      //   meta: {"role": ['merchant']}
      // },
      {
        path: "/Income",
        name: "销售分析",
        component: Income,
        meta: {"role": ['merchant']}
      }
    ]
  },
  {
    path: "/navigation",
    name: "订单管理",
    component: Merchant,
    meta: {"role": ['merchant','admin']},
    children: [
      {
        path: "/Order",
        name: "查看我的总订单",
        component: Order,
        meta: {"role": ['admin','merchant']}
      },
      {
        path: "/Ordersucceed",
        name: "查看完成订单",
        component: Ordersucceed,
        meta: {"role": ['admin','merchant']}
      },
      {
        path: "/Orderfailing",
        name: "查看未完成订单",
        component: Orderfailing,
        meta: {"role": ['admin','merchant']}
      },
      {
        path: "/ReturnOrder",
        name: "查看退货订单",
        component: ReturnOrder,
        meta: {"role": ['admin','merchant']}
      }
    ]
  },
  {
    path: "/navigation",
    name: "用户信息",
    component: Merchant,
    meta: {"role": ['admin']},
    children: [
      {
        path: "/MerchantInfo",
        name: "查看商家信息",
        component: MerchantInfo,
        meta: {"role": ['admin']}
      },
      {
        path: "/ConsumerInfo",
        name: "查看消费者信息",
        component: ConsumerInfo,
        meta: {"role": ['admin']}
      }
    ]
  },
  {
    path: "/navigation",
    name: "评论管理",
    component: Merchant,
    meta: {"role": ['admin']},
    children: [
      {
        path: "/Comment",
        name: "查看商品评论",
        component: Comment,
        meta: {"role": ['admin']}
      }
    ]
  },

  {
    path: "/consumer",
    name: "商城",
    component: ShoppingMall,
    meta: {"role": ['consumer']},
  },
  {
    path: "/type",
    name: "类型",
    component: Type,
    meta: {"role": ['consumer']},
  },
  {
    path: "/myorders",
    name: "我的订单",
    component: MyOrders,
    meta: {"role": ['consumer']}
  },
  {
    path: "/myself",
    name: "我的信息",
    component: Myself,
    meta: {"role": ['consumer']},
  },
  {
    path: "/details",
    name: "商品详细",
    component: Details,
    meta: {"role": ['consumer']},
  },
  {
    path: '/a',
    name: 'a',
    component: A
  },
  {
    path: '/b',
    name: 'b',
    component: B
  },
  {
    path: '/c',
    name: 'c',
    component: C
  },
  
  {
    path: '/',
    name: 'login',
    component: Login
  },
  {
    path: '/register',
    name: 'register',
    component: Register
    },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
