<template>
  <div class="controls-container">
    <div class="controls-timer">{{ new Date().getTime() }}</div>
    <div class="controls-button">
      <button>Start</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Controls',
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
