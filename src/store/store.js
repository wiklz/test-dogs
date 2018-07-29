import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    breedsList: [],
    breeds: []
  },
  actions: {
    loadBreedslist ({ commit }) {
      axios
        .get('https://dog.ceo/api/breeds/list/all')
        .then(r => r.data)
        .then(breeds => {
          commit('SET_BREEDS', breeds)
        })
      axios
        .get('https://images.dog.ceo/breeds/hound-afghan/n02088094_1023.jpg')
        .then(r => r.data)
        .then(images => {
          commit('SET_IMAGES', images)
        })
    }
  },
  mutations: {
    SET_BREEDS (state, breeds) {
      for (let i in breeds.message) {
        if (breeds.message.hasOwnProperty(i)) {
          state.breedsList.push(i)
        }
      }
      let createBreed = function (breedCount) {
        let Breed = {}
        function creator () {
          Breed.name = state.breedsList[breedCount]
          state.breeds.push(Breed)
        }
        return creator()
      }
      for (let i = 0; i < state.breedsList.length; i++) {
        createBreed(i)
        state.breeds[i].id = i
      }
    }
  }
})
