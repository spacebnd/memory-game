<template>
  <div>
    <CardsContainer />
    <ControlsPanel />
  </div>
</template>

<script>
import CardsContainer from '../components/CardsContainer'
import ControlsPanel from '../components/ControlsPanel'
import { ICON_NAMES } from '../constants'
export default {
  name: 'Homepage',

  components: { ControlsPanel, CardsContainer },

  mounted() {
    this.$store.dispatch('generateCardItems', [...ICON_NAMES])
  },
}
</script>

<style scoped></style>
