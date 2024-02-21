import { createRouter, createWebHistory } from 'vue-router'
import ImportView from '@/views/ImportView.vue'
import ImportErrorView from '@/views/ImportErrorView.vue'
import QuizView from '@/views/QuizView.vue'
import { useDataStore } from '@/globals/data'
import { importErrorKey, isTempSet } from '@/globals/temp-storage'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: ImportView
    },
    {
      path: '/import-error',
      component: ImportErrorView,
      beforeEnter: () => {
        if (!isTempSet(importErrorKey)) return '/'
      }
    },
    {
      path: '/quiz',
      component: QuizView,
      beforeEnter: () => {
        if (!useDataStore().isInitialized()) return '/'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      redirect: { path: '/' }
    }
  ]
})

export default router
