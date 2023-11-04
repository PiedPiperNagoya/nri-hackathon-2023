<template>
  <div id="app">
    <header-component />
    <router-view />
  </div>
</template>

<style>
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+JP&family=Oswald&display=swap');
  * {
    font-family: 'Noto Sans JP', sans-serif;
  }
  body, html {
    margin: 0;
    padding: 0;
    color: #222222;
  }
  main {
    padding-top: 60px;
  }
  ::-webkit-scrollbar {
    width:10px;
  }
  ::-webkit-scrollbar-track {
    background-color:#fff;
    border-radius:10px;
    box-shadow:inset 0 0 5px rgba(0, 0, 0, 0);
  }
  ::-webkit-scrollbar-thumb {
    background-color:#000000;
    border-radius: 10px;
    box-shadow:0 0 0 1px rgba(255, 255, 255, 0);
  }
</style>
<script>
  import HeaderComponent from './components/HeaderComponent'
  export default {
    components: {HeaderComponent},
  }
</script>