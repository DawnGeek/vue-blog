<template>
  <div class="back_main">
    <headerC></headerC>
    <div class="main">
      <asideC class="left"></asideC>
      <router-view class="right"></router-view>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'back_main',
    data () {
      return {
        
      }
    },
    methods:{
      
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .back_main{
    width: 100%;
    height: 100%;
  }
  .main{
    overflow: hidden;
    width: 100%;
    height: 100%;
  }
  .main .left{
    float: left;
  }
  .main .right{
    float: left;
  }
</style>
