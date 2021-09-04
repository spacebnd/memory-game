<template>
  <div :class="`${isMobile ? 'leaderboard-container--mobile' : 'leaderboard-container'}`">
    <div class="leaderboard-header">Best results</div>
    <ul class="leaderboard-list">
      <li class="leaderboard-list-item" v-for="(time, index) of leaderboard" :key="index + time">
        <span class="leaderboard-position"> {{ index + 1 }}. </span>
        <span class="leaderboard-time">
          {{ time }}
        </span>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'Leaderboard',

  computed: {
    isMobile() {
      return this.$store.getters['getIsMobile']
    },

    leaderboard() {
      return this.$store.getters['getLeaderboard']
    },
  },

  created() {
    const results = localStorage.getItem('leaderboard')

    if (results?.length) {
      this.$store.commit('setResultToLeaderboard', JSON.parse(results))
    }
  },
}
</script>

<style scoped lang="scss">
.leaderboard-container {
  display: flex;
  flex-direction: column;
  justify-content: center;

  &--mobile {
    margin-top: 20px;
    .leaderboard-list {
      height: auto !important;
    }
  }
}

.leaderboard-header,
.leaderboard-position {
  font-weight: 700;
}

.leaderboard-list {
  min-width: 120px;
  padding: 10px;
  height: 500px;
  list-style: none;
  overflow-y: auto;
}
</style>
