<template>
  <div :class="`${isMobile ? 'layout-container--mobile' : 'layout-container'}`">
    <Controls />
    <CardsContainer />
    <Leaderboard />
  </div>
</template>

<script>
import { ICON_NAMES } from '../constants'
import CardsContainer from '../components/CardsContainer'
import Controls from '../components/Controls'
import Leaderboard from '../components/Leaderboard'
import { isMobile } from 'mobile-device-detect'

export default {
  name: 'Homepage',

  components: { Leaderboard, Controls, CardsContainer },

  computed: {
    isMobile() {
      return this.$store.getters['getIsMobile']
    },
  },

  created() {
    this.$store.commit('setIsMobile', isMobile)
  },

  mounted() {
    this.$store.dispatch('generateCardItems', [...ICON_NAMES])
  },
}
</script>

<style scoped lang="scss">
.layout-container {
  display: flex;
  justify-content: space-evenly;

  &--mobile {
    display: flex;
    flex-direction: column;

    & div:first-child,
    & div:last-child {
      order: 1;
    }
  }
}
</style>
