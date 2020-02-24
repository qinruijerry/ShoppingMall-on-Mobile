<template>
  <div id="home">
    <navbar class="home-nav"><div slot="centernav">购物街</div></navbar>
    <home-swipper :banners="banners"></home-swipper>
    <home-commends :recommends="recommends"></home-commends>
  </div>
</template>


<script>
  import navbar from "components/common/navbar/NavBar";
  import HomeSwipper from "./HomeComponents/HomeSwipper";
  import HomeCommends from "./HomeComponents/HomeCommends";
  import {getMultidata} from "../../network/home";


  export default {
    name: "Home",
    components: {
      navbar, HomeSwipper, HomeCommends
    },
    data() {
      return {
        banners: [],
        recommends: []
      }
    },
    created() {
      getMultidata().then((result) => {
        // console.log(result)
        this.banners = result.data.banner.list;
        this.recommends = result.data.recommend.list;

      })
    }
  }
</script>


<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: white;
  }

</style>
