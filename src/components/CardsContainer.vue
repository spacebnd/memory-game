<template>
  <div class="cards-container">
    <Card v-for="card of cards" :key="card.id" :card="card" />
  </div>
</template>

<script>
import _shuffle from 'lodash/shuffle'
import Card from './Card'

export default {
  name: 'CardsContainer',

  components: { Card },
  data() {
    return {
      cards: [],
    }
  },

  mounted() {
    this.cards = _shuffle(this.$store.getters.cards)
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
  width: 70%;
  margin: 0 auto;
}
</style>
