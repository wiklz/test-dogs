import Vue from 'vue'
import Router from 'vue-router'
import MainPage from '@/components/MainPage'
import FavouritesPage from '@/components/FavouritesPage'
import BreedPage from '@/components/BreedPage'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'MainPage',
      component: MainPage
    },
    {
      path: '/favorites',
      name: 'FavouritesPage',
      component: FavouritesPage
    },
    {
      path: '/:id',
      component: BreedPage
    }
  ]
})
