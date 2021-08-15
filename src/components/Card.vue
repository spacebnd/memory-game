<template>
  <div class="card-container" @click="cardClickHandler">
    <img
      v-show="isCardOpen"
      :src="require(`../assets/icons/${card.name}.png`)"
      :alt="`${card.name} icon`"
      class="card-image"
    />
  </div>
</template>

<script>
export default {
  name: 'Card',

  props: {
    card: {
      type: Object,
      required: true,
    },
  },

  computed: {
    isCardOpen() {
      return this.$store.getters['getOpenedCards'].includes(this.card.id)
    },
  },

  methods: {
    cardClickHandler() {
      this.$store.dispatch('openCard', this.card.id)
    },
  },
}
</script>

<style lang="scss" scoped>
.card-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 80px;
  width: 15%;
  margin: 5px;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  transition: box-shadow ease 0.3s;

  &:hover {
    box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
    transition: box-shadow ease 0.3s;
  }

  .card-image {
    width: 30%;
  }
}
</style>
