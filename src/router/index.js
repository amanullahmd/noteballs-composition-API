import { createRouter, createMemoryHistory } from 'vue-router'

import ViewNotes from '@/view/ViewNotes.vue'
import ViewStats from '@/view/ViewStats.vue'

const routes = [
  { path: '/', name: 'home', component: ViewNotes },
  { path: '/stats', name: 'stats', component: ViewStats }
]

const router = createRouter({
  history: createMemoryHistory(),
  routes: routes
})

export default router
