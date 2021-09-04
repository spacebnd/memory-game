<template>
  <div id="app" :class="{ mobile: isMobile }">
    <Homepage />
  </div>
</template>

<script>
import Homepage from './views/Homepage'

export default {
  name: 'App',

  components: {
    Homepage,
  },

  computed: {
    isMobile() {
      return this.$store.getters['getIsMobile']
    },
  },
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.mobile {
  margin-top: 10px !important;
}
</style>
