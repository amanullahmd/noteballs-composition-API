import { createRouter, createWebHistory } from 'vue-router'

import ViewNotes from '@/view/ViewNotes.vue'
import ViewStats from '@/view/ViewStats.vue'
import ViewEditNote from '@/view/ViewEditNote.vue'
import ViewAuth from '@/view/ViewAuth.vue'

const routes = [
  { path: '/', name: 'home', component: ViewNotes },
  { path: '/editNote/:id', name: 'editNote', component: ViewEditNote },
  { path: '/stats', name: 'stats', component: ViewStats },
  { path: '/auth', name: 'auth', component: ViewAuth }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
