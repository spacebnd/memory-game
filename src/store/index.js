import Vue from 'vue'
import Vuex from 'vuex'
import { generateCardItem } from '../utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cardItems: [],
  },

  getters: {
    getCardItems: (state) => state.cardItems,
  },

  mutations: {
    setCardItems(state, payload) {
      state.cardItems = payload
    },
  },

  actions: {
    generateCardItems({ commit }, payload) {
      const cardItems = payload.reduce((acc, currentName) => {
        acc.push(generateCardItem(currentName))
        acc.push(generateCardItem(currentName))
        return acc
      }, [])

      commit('setCardItems', cardItems)
    },
  },
})
