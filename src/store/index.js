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
    isGameInProgress: false,
    isUiLocked: true,
    cards: [],
    firstCard: null,
    secondCard: null,
    excludedCards: [],
    matchCards: [],
    cardTimer: null,
    leaderboard: [],
  },

  getters: {
    getIsGameInProgress: (state) => state.isGameInProgress,

    getIsGameOver: (state) => state.cards.length === state.excludedCards.length,

    getIsUiLocked: (state) => state.isUiLocked,

    getCards: (state) => state.cards,

    getOpenCards: (state) => [state.firstCard, state.secondCard],

    getExcludedCards: (state) => state.excludedCards,

    getMatchCards: (state) => state.matchCards,

    getLeaderboard: (state) => state.leaderboard,
  },

  mutations: {
    setIsGameInProgress(state, payload) {
      state.isGameInProgress = payload
    },

    setIsUiLocked(state, payload) {
      state.isUiLocked = payload
    },

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

    setResultToLeaderboard(state, time) {
      state.leaderboard.push(time)
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

    startGame({ commit }) {
      commit('setIsGameInProgress', true)
      commit('setIsUiLocked', false)
    },

    finishGame({ commit }, time) {
      commit('setIsGameInProgress', false)
      commit('setIsUiLocked', true)
      commit('setResultToLeaderboard', time)
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

        commit('setIsUiLocked', true)
        setTimeout(
          () => {
            if (isMatch) {
              commit('setMatchCards', null)
              commit('setExcludedCards', [firstCard.id, secondCard.id])
            }
            commit('resetAllOpenCards')
            commit('resetCardTimer')
            commit('setIsUiLocked', false)
          },
          isMatch ? MATCH_DISPLAY_DURATION : ERROR_DISPLAY_DURATION
        )
      }
    },
  },
})
