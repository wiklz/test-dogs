import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './../router'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    breeds: [],
    breedsNames: [],
    sortedImages: [],
    displayedBreed: null
  },
  getters: {
    getBreeds: function (state) {
      let subBreeds = []
      for (const name of state.breedsNames) {
        if (state.breeds[name].length > 0) {
          for (let i = 0; i < state.breeds[name].length; i++) {
            subBreeds.push('' + name + ' ' + state.breeds[name][i])
          }
        } else {
          subBreeds.push(name)
        }
      }
      subBreeds.splice(127, 1)
      // console.log(subBreeds.length)
      return subBreeds
    },
    randomImages: function (state) {
      if (state.sortedImages.length === 20) {
        return state.sortedImages
      }
    }
  },
  actions: {
    // ****** LOADING BREEDS LIST ******
    loadBreedsList ({ commit }) {
      axios
        .get('https://dog.ceo/api/breeds/list/all')
        .then(r => r.data)
        .then(breeds => {
          commit('SET_BREEDS', breeds.message)
        })
    },
    selectChange ({ commit }, breed) {
      commit('selectChange', breed.breed)
    },
    initialSort ({ commit, state }) {
      state.sortedImages = []
      for (let i = 0; i < 20; i++) {
        axios
          .get('https://dog.ceo/api/breeds/image/random')
          .then(r => r.data)
          .then(breed => {
            commit('SORT_IMAGES', breed.message)
          })
      }
    },
    changeSort ({ commit, state }, breed) {
      state.sortedImages = []
      if (breed.breed !== 'all') {
        for (let i = 0; i < 20; i++) {
          let str = breed.breed.toString()
          str = str.replace(/\s/g, '/')
          axios
            .get('https://dog.ceo/api/breed/' + str + '/images/random')
            .then(r => r.data)
            .then(breed => {
              commit('SORT_IMAGES', breed.message)
            })
        }
      } else {
        for (let i = 0; i < 20; i++) {
          axios
            .get('https://dog.ceo/api/breeds/image/random')
            .then(r => r.data)
            .then(breed => {
              commit('SORT_IMAGES', breed.message)
            })
        }
      }
    }
  },
  mutations: {
    SET_BREEDS (state, breeds) {
      state.breeds = breeds
      state.breedsNames = Object.getOwnPropertyNames(breeds)
      // ****** CREATING BREEDS` NAMES AND LINKS TO REQUEST IMAGES LATER ******
      // ****** SETTING UP BREEDS` IDs AND IMAGES LINKS ******
      // for (let i = 0; i < state.breeds.length; i++) {
      //   state.breeds[i].id = i
      //   axios
      //     .get(state.breeds[i].imageSrc)
      //     .then(r => r.data)
      //     .then(imagesSrc => {
      //       state.breeds[i].images.push(imagesSrc.message)
      //     })
      // }
    },
    SORT_IMAGES (state, image) {
      state.sortedImages.push(image)
    },
    selectChange (state, breed) {
      let str = breed.toString()
      str = str.replace(/\s/g, '-')
      router.push({path: '/' + str})
    }
  }
})
