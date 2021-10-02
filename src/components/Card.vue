<template>
  <div
    class="card-container"
    :class="[{ match: isMatch }, { excluded: isExcluded }, { 'card-container--mobile': isMobile }]"
    @click="cardClickHandler"
  >
    <transition name="fade">
      <img
        v-show="isOpen || isExcluded"
        :src="require(`../assets/icons/${card.name}.png`)"
        :alt="`${card.name} icon`"
        class="card-image"
      />
    </transition>
  </div>
</template>

<script>
import { mapActions, mapGetters, mapState } from 'vuex'

export default {
  name: 'Card',

  props: {
    card: {
      type: Object,
      required: true,
    },
  },

  computed: {
    ...mapState(['isMobile', 'isUiLocked', 'excludedCards', 'matchCards']),
    ...mapGetters({ openCards: 'getOpenCards' }),

    isOpen() {
      return this.openCards.includes(this.card.id)
    },

    isExcluded() {
      return this.excludedCards.includes(this.card.id)
    },

    isMatch() {
      return this.matchCards.includes(this.card.id)
    },
  },

  methods: {
    ...mapActions(['openCard']),

    cardClickHandler() {
      if (!this.isUiLocked && !this.isExcluded) {
        this.openCard(this.card.id)
      }
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
  user-select: none;

  &--mobile {
    height: 8vh;
    width: 20vw;
    margin: 4px;
  }

  &:hover:not(&--mobile) {
    box-shadow: rgba(0, 0, 0, 0.25) 0 54px 55px, rgba(0, 0, 0, 0.12) 0px -12px 30px,
      rgba(0, 0, 0, 0.12) 0px 4px 6px, rgba(0, 0, 0, 0.17) 0px 12px 13px,
      rgba(0, 0, 0, 0.09) 0px -3px 5px;
    transition: box-shadow ease 0.3s;
  }

  .card-image {
    width: 30%;
  }
}

.excluded {
  background-color: rgba(105, 105, 105, 0.3);
}

.match {
  background-color: rgba(34, 139, 34, 0.3);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
