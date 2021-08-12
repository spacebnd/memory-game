import Vue from 'vue'
import Vuex from 'vuex'
import { CARDS } from '../constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: [...CARDS],
  },
  getters: {
    cards: (state) => state.cards,
  },
  mutations: {},
  actions: {},
  modules: {},
})
