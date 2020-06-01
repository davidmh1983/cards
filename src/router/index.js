import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/', redirect: () => { return '/deck/new';},
    name: 'Start Point'
  },
  {
    path: '/deck/new',
    name: 'New',
    component: () => import('../views/New.vue')
  },
  {
    path: '/deck/:deckId',
    name: 'About',
    component: () => import('../views/Deck.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
