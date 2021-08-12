<template>
  <div>
    <CardsContainer />
    <ControlsPanel />
  </div>
</template>

<script>
import CardsContainer from './CardsContainer'
import ControlsPanel from './ControlsPanel'
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
