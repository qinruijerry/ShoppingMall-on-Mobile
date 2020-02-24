<template>
  <div class="navbar">
    <div class="leftbar"><slot name="leftnav"></slot></div>
    <div class="centerbar"><slot name="centernav"></slot></div>
    <div class="rightbar"><slot name="rightnav"></slot></div>
  </div>
</template>


<script>
    export default {
        name: "NavBar"
    }
</script>


<style scoped>
  .navbar {

    display:flex;

    height: 44px;
    line-height: 44px;

    box-shadow: 0 1px 1px rgba(100,100,100,.1)

  }

  .centerbar {
    flex: 1;
    text-align: center;


  }
  .leftbar, .rightbar{
    width: 60px;
  }

</style>
