<template>
  <div class="layout-container">
    <Controls />
    <CardsContainer />
    <Leaderboard />
  </div>
</template>

<script>
import CardsContainer from '../components/CardsContainer'
import Controls from '../components/Controls'
import { ICON_NAMES } from '../constants'
import Leaderboard from '../components/Leaderboard'
export default {
  name: 'Homepage',

  components: { Leaderboard, Controls, CardsContainer },

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
