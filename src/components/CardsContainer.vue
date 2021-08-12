<template>
  <div class="cards-container">
    <Card v-for="card of cardItems" :key="card.id" :card="card" />
  </div>
</template>

<script>
import _shuffle from 'lodash/shuffle'
import Card from './Card'

export default {
  name: 'CardsContainer',

  components: { Card },

  computed: {
    cardItems() {
      return _shuffle(this.$store.getters['getCardItems'])
    },
  },
}
</script>

<style scoped>
.cards-container {
  position: relative;
  display: flex;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  width: 60%;
  margin: 0 auto;
}
</style>
