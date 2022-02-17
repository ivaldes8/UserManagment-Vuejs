import Vue from 'vue'
import VueRouter from 'vue-router'
import Gateway from '../views/Gateway.vue'
import GatewayEdit from '../views/GatewayEdit.vue'
import Device from '../views/Device.vue'
import DeviceEdit from '../views/DeviceEdit.vue'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/gateways',
    name: 'Gateways',
    component: Gateway
  },
  {
    path: '/gateways/:id',
    name: 'GatewayEdit',
    component: GatewayEdit
  },
  {
    path: '/devices',
    name: 'Devices',
    component: Device
  },
  {
    path: '/devices/:id',
    name: 'DeviceEdit',
    component: DeviceEdit
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
