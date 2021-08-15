<template>
  <div class="controls-container">
    <div class="controls-timer">
      <p>{{ formattedCurrentTime }}</p>
    </div>
    <div class="controls-button">
      <button @click="startButtonHandler" :disabled="isGameInProgress">Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',

  data() {
    return {
      currentTime: 0,
      timer: null,
    }
  },
  computed: {
    isGameInProgress() {
      return this.$store.getters['getIsGameInProgress']
    },

    isGameOver() {
      return this.$store.getters['getIsGameOver']
    },

    formattedCurrentTime() {
      const date = new Date(null)
      date.setSeconds(this.currentTime / 1000)
      const utc = date.toUTCString()
      return utc.substr(utc.indexOf(':') - 2, 8)
    },
  },

  methods: {
    startButtonHandler() {
      this.$store.dispatch('startGame')

      this.timer = setInterval(() => {
        this.currentTime += 1000

        if (this.isGameOver) {
          clearInterval(this.timer)
          this.$store.dispatch('finishGame', this.formattedCurrentTime)
          this.currentTime = 0
        }
      }, 1000)
    },
  },
}
</script>

<style scoped lang="scss">
.controls-container {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;

  .controls-timer {
    margin-bottom: 20px;
  }
}
</style>
