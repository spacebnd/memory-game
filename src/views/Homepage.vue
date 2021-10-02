<template>
  <div :class="`${isMobile ? 'layout-container--mobile' : 'layout-container'}`">
    <Controls />
    <CardsContainer />
    <Leaderboard />
  </div>
</template>

<script>
import { mapActions, mapMutations, mapState } from 'vuex'
import { isMobile } from 'mobile-device-detect'
import { ICON_NAMES } from '../constants'
import CardsContainer from '../components/CardsContainer'
import Controls from '../components/Controls'
import Leaderboard from '../components/Leaderboard'

export default {
  name: 'Homepage',

  components: { Leaderboard, Controls, CardsContainer },

  computed: {
    ...mapState(['isMobile']),
  },

  created() {
    this.setIsMobile(isMobile)
  },

  mounted() {
    this.generateCardItems([...ICON_NAMES])
  },

  methods: {
    ...mapActions(['generateCardItems']),
    ...mapMutations(['setIsMobile']),
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
