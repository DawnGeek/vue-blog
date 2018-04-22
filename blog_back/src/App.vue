<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App',
  }
</script>

<style>
  *{
    margin: 0;
    padding: 0;
    list-style: none;
  }
  body, html{
    width: 100%;
    height: 100%;
  }
  #app{
    width: 100%;
    height: 100%;
  }
  .p{
    width: 80%;
    background: yellow;
    margin: 0 auto;
    text-align: center;
    color: red;
  }
</style>
