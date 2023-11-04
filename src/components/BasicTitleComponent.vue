<template>
  <h1>
    {{ title }}
  </h1>
</template>

<script>
  export default {
    name: 'BasicTitleComponent',
    props: {
      title: {
        type: String,
        required: true,
      },
    },
  }
</script>

<style scoped lang="scss">
  h1 {
    display: block;
    width: 90%;
    max-width: 400px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    font-size: 24px;
    font-weight: bold;
    text-align: center;
  }
</style>