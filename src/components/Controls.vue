<template>
  <div :class="`${isMobile ? 'controls-container--mobile' : 'controls-container'}`">
    <div class="controls-timer">
      <span>{{ formattedCurrentTime }}</span>
    </div>
    <div class="controls-button">
      <button @click="startButtonHandler" :disabled="isGameInProgress">Start</button>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Controls',

  data() {
    return {
      currentTime: 0,
      timer: null,
    }
  },

  computed: {
    ...mapGetters({
      isMobile: 'getIsMobile',
      isGameInProgress: 'getIsGameInProgress',
      isGameOver: 'getIsGameOver',
    }),

    formattedCurrentTime() {
      const date = new Date(null)
      date.setSeconds(this.currentTime / 1000)
      const utc = date.toUTCString()
      return utc.substr(utc.indexOf(':') - 2, 8)
    },
  },

  beforeDestroy() {
    clearInterval(this.timer)
  },

  methods: {
    ...mapActions(['startGame', 'finishGame']),

    startButtonHandler() {
      this.startGame()

      this.timer = setInterval(() => {
        this.currentTime += 1000

        if (this.isGameOver) {
          clearInterval(this.timer)
          this.finishGame(this.formattedCurrentTime)
          this.currentTime = 0
        }
      }, 1000)
    },
  },
}
</script>

<style scoped lang="scss">
.controls-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: auto;

  &--mobile {
    margin-top: 10px;

    button {
      width: 50% !important;
    }
  }
}

.controls-button {
  button {
    width: 100%;
    height: 30px;
    font-family: Avenir, Helvetica, Arial, sans-serif;
    font-weight: 700;
    background-color: #9ece9e;
    border: 1px solid black;
    border-radius: 5px;
    color: black;
    cursor: pointer;
    user-select: none;
    transition: background-color ease 0.5s;

    &:hover:enabled {
      background-color: #62ab62;
      transition: background-color ease 0.5s;
    }

    &:focus {
      color: black;
    }

    &:disabled {
      color: #808080;
      background-color: #c9c9c9;
      transition: background-color ease 0.5s;
    }
  }
}
</style>
