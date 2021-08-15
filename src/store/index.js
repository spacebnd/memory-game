import Vue from 'vue'
import Vuex from 'vuex'
import { generateCardItem } from '../utils'
import {
  ERROR_DISPLAY_DURATION,
  MATCH_DISPLAY_DURATION,
  OPEN_CARD_DISPLAY_DURATION,
} from '../constants'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cards: [],
    firstCard: null,
    secondCard: null,
    excludedCards: [],
    matchCards: [],
    cardTimer: null,
    isUiLocked: false,
  },

  getters: {
    getCards: (state) => state.cards,

    getOpenCards: (state) => [state.firstCard, state.secondCard],

    getExcludedCards: (state) => state.excludedCards,

    getMatchCards: (state) => state.matchCards,

    getIsUiLocked: (state) => state.isUiLocked,
  },

  mutations: {
    setCards(state, payload) {
      state.cards = payload
    },

    setOpenCard(state, payload) {
      state[payload.targetCard] = payload.id
    },

    resetOpenCard(state, targetCard) {
      state[targetCard] = null
    },

    resetAllOpenCards(state) {
      state.firstCard = null
      state.secondCard = null
    },

    setMatchCards(state, payload) {
      if (payload) {
        payload.forEach((id) => {
          state.matchCards.push(id)
        })
      } else {
        state.matchCards = []
      }
    },

    setExcludedCards(state, ids) {
      ids.forEach((id) => {
        state.excludedCards.push(id)
      })
    },

    setCardTimer(state, callback) {
      state.cardTimer = setTimeout(() => {
        callback()
      }, OPEN_CARD_DISPLAY_DURATION)
    },

    resetCardTimer(state) {
      clearTimeout(state.cardTimer)
    },

    toggleIsUiLocked(state, payload) {
      state.isUiLocked = payload
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

    openCard({ commit, state }, id) {
      const targetCard = state.firstCard ? 'secondCard' : 'firstCard'
      const payload = {
        targetCard,
        id,
      }
      commit('setOpenCard', payload)

      if (targetCard === 'firstCard') {
        const callback = () => commit('resetAllOpenCards')
        commit('setCardTimer', callback)
      } else {
        const firstCard = state.cards.find((card) => card.id === state.firstCard)
        const secondCard = state.cards.find((card) => card.id === state.secondCard)
        const isMatch = firstCard.name !== null && firstCard.name === secondCard.name

        if (isMatch) {
          commit('setMatchCards', [firstCard.id, secondCard.id])
        }

        commit('toggleIsUiLocked', true)
        setTimeout(
          () => {
            if (isMatch) {
              commit('setMatchCards', null)
              commit('setExcludedCards', [firstCard.id, secondCard.id])
            }
            commit('resetAllOpenCards')
            commit('resetCardTimer')
            commit('toggleIsUiLocked', false)
          },
          isMatch ? MATCH_DISPLAY_DURATION : ERROR_DISPLAY_DURATION
        )
      }
    },
  },
})
