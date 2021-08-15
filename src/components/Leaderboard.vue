<template>
  <div class="leaderboard-container">
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
    leaderboard() {
      return this.$store.getters['getLeaderboard']
    },
  },
}
</script>

<style scoped lang="scss">
.leaderboard-container {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;

  .leaderboard-header,
  .leaderboard-position {
    font-weight: 700;
  }

  .leaderboard-list {
    list-style: none;
    padding: 0;
  }
}
</style>
