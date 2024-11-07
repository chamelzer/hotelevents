import { createRouter, createWebHistory } from 'vue-router'
import EventView from '../views/EventView.vue'
import InfoView from '@/views/InfoView.vue'
import BookingView from '@/views/BookingView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: EventView
    },
    {
      path: "/event/:id",
      name: "event",
      component: InfoView
    },
    {
      path: '/booking',
      name: 'booking',
      component: BookingView
    }
  ]
})

export default router
