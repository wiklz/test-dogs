import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    breeds: [],
    displayedBreed: null
  },
  actions: {
    // ****** LOADING BREEDS LIST ******
    loadBreedsList ({ commit }) {
      axios
        .get('https://dog.ceo/api/breeds/list/all')
        .then(r => r.data)
        .then(breeds => {
          commit('SET_BREEDS', breeds)
        })
    },
    pageChange ({ commit, state }, id) {
      commit('breedChange', id)
    }
  },
  mutations: {
    SET_BREEDS (state, breeds) {
      delete breeds.message.coton
      breeds = breeds.message
      // ****** CREATING BREEDS` NAMES AND LINKS TO REQUEST IMAGES LATER ******
      for (const breed of Object.keys(breeds)) {
        if (breeds[breed].length > 0) {
          for (let i = 0; i < breeds[breed].length; i++) {
            state.breeds.push({
              name: breeds[breed][i] + ' ' + breed,
              imageSrc: 'https://dog.ceo/api/breed/' + breed + '-' + breeds[breed][i] + '/images',
              images: []
            })
          }
        } else {
          state.breeds.push({
            name: breed,
            imageSrc: 'https://dog.ceo/api/breed/' + breed + '/images',
            images: []
          })
        }
      }
      // ****** SETTING UP BREEDS` IDs AND IMAGES LINKS ******
      for (let i = 0; i < state.breeds.length; i++) {
        state.breeds[i].id = i
        axios
          .get(state.breeds[i].imageSrc)
          .then(r => r.data)
          .then(imagesSrc => {
            state.breeds[i].images.push(imagesSrc.message)
          })
      }
    },
    breedChange (state, { id }) {
      state.displayedBreed = id
      router.push({ path: '/' + id })
    }
  }
})
