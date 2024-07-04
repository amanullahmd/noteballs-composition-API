import { createRouter, createWebHistory } from 'vue-router'
import { useStoreAuth } from '@/stores/storeAuth'
import ViewNotes from '@/view/ViewNotes.vue'
import ViewStats from '@/view/ViewStats.vue'
import ViewEditNote from '@/view/ViewEditNote.vue'
import ViewAuth from '@/view/ViewAuth.vue'

const appTitle = 'Noteballs'
const DEFAULT_TITLE = 'Noteballs'

const routes = [
  {
    path: '/',
    name: 'home',
    component: ViewNotes,
    meta: {
      title: `${appTitle} - Notes`
    }
  },
  {
    path: '/editNote/:id',
    name: 'editNote',
    component: ViewEditNote,
    meta: {
      title: `${appTitle} - Update note`
    }
  },
  {
    path: '/stats',
    name: 'stats',
    component: ViewStats,
    meta: {
      title: `${appTitle} - Stats`
    }
  },
  {
    path: '/auth',
    name: 'auth',
    component: ViewAuth,
    meta: {
      title: `${appTitle} - Register`
    }
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

// Navigation guard
router.beforeEach(async (to, from, next) => {
  document.title = to.meta?.title ?? DEFAULT_TITLE

  const storeAuth = useStoreAuth()

  const authorizedRoutes = ['home', 'editNote', 'stats']
  const publicRoutes = ['auth']

  if (authorizedRoutes.includes(to.name)) {
    if (!storeAuth.user.id) {
      // If not logged in, redirect to home
      next({ name: 'auth' })
    } else {
      // If logged in, allow navigation
      next()
    }
  } else if (publicRoutes.includes(to.name)) {
    // Allow access to public routes
    next()
  } else {
    // If route not found, redirect to home
    next({ name: 'auth' })
  }
})

export default router
