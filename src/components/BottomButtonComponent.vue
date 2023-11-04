<template>
  <div
    class="bottom-button">
    <button
      @click="$emit('onclick')">
      {{ content }}
    </button>
  </div>
</template>

<script>
  export default {
    name: 'BottomButtonComponent',
    props: {
      content: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style scoped lang="scss">
  .bottom-button {
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 200;
    display: block;
    width: 100%;
    margin: 0;
    padding: 20px 0;
  }
  button {
    display: block;
    width: 90%;
    max-width: 400px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    border-radius: 5px;
    background-color: #FF5700;
    color: #ffffff;
    font-weight: bold;
    font-size: 20px;
    border: none;
    outline: none;
  }
</style>