<template>
  <div class="layout-container">
    <ControlsPanel />
    <CardsContainer />
    <Leaderboard />
  </div>
</template>

<script>
import CardsContainer from '../components/CardsContainer'
import ControlsPanel from '../components/ControlsPanel'
import { ICON_NAMES } from '../constants'
import Leaderboard from '../components/Leaderboard'
export default {
  name: 'Homepage',

  components: { Leaderboard, ControlsPanel, CardsContainer },

  mounted() {
    this.$store.dispatch('generateCardItems', [...ICON_NAMES])
  },
}
</script>

<style scoped lang="scss">
.layout-container {
  display: flex;
  justify-content: space-evenly;
}
</style>
