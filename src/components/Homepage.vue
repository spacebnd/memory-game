<template>
  <div>
    Homepage
    <CardsContainer />
    <ControlsPanel />
  </div>
</template>

<script>
import CardsContainer from './CardsContainer'
import ControlsPanel from './ControlsPanel'
export default {
  name: 'Homepage',
  components: { ControlsPanel, CardsContainer },
}
</script>

<style scoped></style>
