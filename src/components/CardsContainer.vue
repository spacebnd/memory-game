<template>
  <div :class="`${isMobile ? 'cards-container--mobile' : 'cards-container'}`">
    <Card v-for="card of shuffledCards" :key="card.id" :card="card" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
import _shuffle from 'lodash/shuffle'
import Card from './Card'

export default {
  name: 'CardsContainer',

  components: { Card },

  computed: {
    ...mapState(['isMobile', 'cards']),

    shuffledCards() {
      return _shuffle(this.cards)
    },
  },
}
</script>

<style scoped lang="scss">
.cards-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 60%;

  &--mobile {
    width: 100% !important;
    position: relative;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    padding: 2px;
  }
}
</style>
