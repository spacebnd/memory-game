import Vue from 'vue'
import Vuex from 'vuex'
import { generateCardItem } from '../utils'
import { OPEN_CARD_DURATION } from '../constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: [],
    firstCard: null,
    secondCard: null,
    cardTimer: null,
  },

  getters: {
    getCards: (state) => state.cards,

    getOpenedCards: (state) => [state.firstCard, state.secondCard],

    isBothCardsOpened: (state) => !!(state.firstCard && state.secondCard),
  },

  mutations: {
    setCards(state, payload) {
      state.cards = payload
    },

    setOpenedCard(state, payload) {
      state[payload.targetCard] = payload.id
    },

    resetOpenedCard(state, targetCard) {
      state[targetCard] = null
    },

    resetAllOpenedCards(state) {
      state.firstCard = null
      state.secondCard = null
    },

    setCardTimer(state, callback) {
      state.cardTimer = setTimeout(() => {
        callback()
      }, OPEN_CARD_DURATION)
    },

    resetCardTimer(state) {
      clearTimeout(state.cardTimer)
    },
  },

  actions: {
    generateCardItems({ commit }, payload) {
      const cards = payload.reduce((acc, currentName) => {
        acc.push(generateCardItem(currentName))
        acc.push(generateCardItem(currentName))
        return acc
      }, [])

      commit('setCards', cards)
    },

    openCard({ commit, state, getters }, id) {
      if (getters.isBothCardsOpened) {
        commit('resetAllOpenedCards')
        commit('resetCardTimer')
      }

      const targetCard = state.firstCard ? 'secondCard' : 'firstCard'
      const payload = {
        targetCard,
        id,
      }
      commit('setOpenedCard', payload)

      if (targetCard === 'firstCard') {
        const callback = () => commit('resetAllOpenedCards')
        commit('setCardTimer', callback)
      }
    },
  },
})
