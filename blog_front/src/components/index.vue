<template>
  <div id="index">
    <headers></headers>
    <div class="section">
      <sections></sections>
    </div>
  </div>
</template>

<script>
  import headers from '../components/headers'
  import sections from '../components/sections'
  export default {
    data() {
      return {
        msg: 'welcome to index'
      }
    },
    components: {
      headers,
      sections
    }
  }
</script>

<style scoped>
  #index{
    width: 75%;
    margin: 10px auto;
  }
</style>