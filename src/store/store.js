import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import router from './../router'
const STORAGE_KEY = 'favourites'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    breeds: [],
    breedsNames: [],
    sortedImages: [],
    favourites: [],
    displayedBreed: null,
    bottom: false
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
    setImages: function (state) {
      if (state.sortedImages.length >= 20) {
        return state.sortedImages
      }
    },
    getFavourites: function (state) {
      return state.favourites
    }
  },
  actions: {
    // ****** FORCING TO RESTART AT MAIN PAGE ******
    mainPageLoader ({ commit }, route) {
      commit('goHome', route)
    },
    // ****** LOADING BREEDS LIST ******
    loadBreedsList ({ commit }) {
      axios
        .get('https://dog.ceo/api/breeds/list/all')
        .then(r => r.data)
        .then(breeds => {
          commit('SET_BREEDS', breeds.message)
        })
    },
    // ****** TOP SELECT CHANGES ******
    selectChange ({ commit }, breed) {
      commit('selectChange', breed.breed)
    },
    // ****** GETTING MAIN PAGE INITIAL IMAGES ******
    initialSort ({ commit, state }) {
      state.sortedImages = []
      for (let i = 0; i < 20; i++) {
        axios
          .get('https://dog.ceo/api/breeds/image/random')
          .then(r => r.data)
          .then(breed => {
            commit('ADD_IMAGE', breed.message)
          })
      }
    },
    // ****** HANDLING CHANGING SORT BY BREED ON MAIN PAGE ******
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
              commit('ADD_IMAGE', breed.message)
            })
        }
      } else {
        for (let i = 0; i < 20; i++) {
          axios
            .get('https://dog.ceo/api/breeds/image/random')
            .then(r => r.data)
            .then(breed => {
              commit('ADD_IMAGE', breed.message)
            })
        }
      }
    },
    // ****** GETTING SINGLE BREED PAGE IMAGES ******
    singleBreedImages ({ commit, state }, breed) {
      state.sortedImages = []
      for (let i = 0; i < 20; i++) {
        let str = breed.breed.toString()
        str = str.replace(/\s/g, '/')
        axios
          .get('https://dog.ceo/api/breed/' + str + '/images/random')
          .then(r => r.data)
          .then(breed => {
            commit('ADD_IMAGE', breed.message)
          })
      }
    },
    // ****** ADDING IMAGES ******
    addImages ({commit, state}, breed) {
      if (breed !== 'all') {
        for (let i = 0; i < 5; i++) {
          let str = breed.toString()
          str = str.replace(/\s/g, '/')
          axios
            .get('https://dog.ceo/api/breed/' + str + '/images/random')
            .then(r => r.data)
            .then(breed => {
              commit('ADD_IMAGE', breed.message)
            })
        }
      } else {
        for (let i = 0; i < 20; i++) {
          axios
            .get('https://dog.ceo/api/breeds/image/random')
            .then(r => r.data)
            .then(breed => {
              commit('ADD_IMAGE', breed.message)
            })
        }
      }
    },
    // ****** ADDING IMAGES TO FAVOURITES(localStorage)******
    addToFavourites ({ commit, state }, image) {
      commit('ADD_TO_FAVOURITES', image)
    },
    // ****** GETTING IMAGES FROM FAVOURITES(localStorage)******
    getFavourites ({ commit }) {
      commit('GET_FAVOURITES')
    },
    // ****** REMOVE AN IMAGE FROM FAVOURITES(localStorage)******
    removeFromFavourites ({ commit, state }, image) {
      commit('REMOVE_FROM_FAVOURITES', image.src)
    },
    // ****** RESETS TOP SELECTOR AT CHANGING PAGE TO HOME OR FAVOURITES ******
    clearTopSelect () {
      let select = document.querySelector('#breed-select')
      select.value = null
    }
  },
  mutations: {
    goHome (state, route) {
      route = route.toString()
      route !== '/' && route !== '/favorites' ? router.push({path: '/'}) : console.log('building...')
    },
    SET_BREEDS (state, breeds) {
      state.breeds = breeds
      state.breedsNames = Object.getOwnPropertyNames(breeds)
    },
    ADD_IMAGE (state, image) {
      state.sortedImages.push(image)
    },
    ADD_TO_FAVOURITES (state, image) {
      state.favourites.push(image.src)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favourites))
      image.btn.setAttribute('disabled', true)
      image.btn.classList.add('disabled')
      image.btn.innerText = 'Added'
      image.btn.style.backgroundColor = 'darkgreen'
    },
    GET_FAVOURITES (state) {
      state.favourites = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    },
    REMOVE_FROM_FAVOURITES (state, image) {
      state.favourites.splice(state.favourites.indexOf(image), 1)
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.favourites))
    },
    selectChange (state, breed) {
      let str = breed.toString()
      str = str.replace(/\s/g, '-')
      router.push({path: '/' + str})
      state.displayedBreed = breed
    }
  }
})
