import { createRouter, createMemoryHistory } from 'vue-router'

import ViewNotes from '@/view/ViewNotes.vue'
import ViewStats from '@/view/ViewStats.vue'

const routes = [
    { path: '/', component: ViewNotes },
    { path: '/stats', component: ViewStats },
  ]
  
  const router = createRouter({
    history: createMemoryHistory(),
    routes,
  })

  export default router