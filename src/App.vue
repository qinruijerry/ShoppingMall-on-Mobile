<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <tabbar></tabbar>
  </div>
</template>

<script>

  import tabbar from "components/content/mainTabbar/maintabbar"


  export default {
    name: "App",
    components: {
      tabbar,
    }
  }



</script>

<style>
  @import "assets/css/base.css";
</style>
