import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
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
    }
  },
  mutations: {
    SET_BREEDS (state, breeds) {
      state.breeds = breeds
    }
  }
})
