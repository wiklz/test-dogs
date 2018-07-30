import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    breeds: [],
    displayedBreed: 0,
    images: []
  },
  getters: {
    imgSrcGetter: state => {
      return state.breeds.map(breed => {
        return {
          name: breed.name
        }
      })
    }
  },
  actions: {
    loadBreedsList ({ commit }) {
      axios
        .get('https://dog.ceo/api/breeds/list/all')
        .then(r => r.data)
        .then(breeds => {
          commit('SET_BREEDS', breeds)
        })
    }
  },
  mutations: {
    SET_BREEDS (state, breeds) {
      let breed = Object.keys(breeds.message)
      for (let i = 0; i < breed.length; i++) {
        state.breeds.push(
          {
            name: breed[i],
            id: i
          }
        )
      }
    }
  }
})
