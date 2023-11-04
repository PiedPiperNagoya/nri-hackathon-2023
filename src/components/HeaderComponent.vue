<template>
  <header>
    <!-- navigation -->
    <navigation-component
      :authed="authed"/>
  </header>
</template>

<script>
  import NavigationComponent from './NavigationComponent'
  export default {
    name: 'HeaderComponent',
    components: {NavigationComponent},
    data() {
      return {
        authed: false,
      }
    },
  }
</script>

<style scoped lang="scss">
  header {
    position: fixed;
    z-index: 200;
    display: block;
    width: 100%;
    height: 60px;
    background-color: #ffffff;
  }
</style>