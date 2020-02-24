<template>
  <div>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image">
        </a>
      </swiper-item>
    </swiper>
  </div>

</template>


<script>
  import {Swiper, SwiperItem} from "components/common/swiperbar/index.js";
    export default {
        name: "HomeSwipper",
      components: {
          SwiperItem, Swiper
      },
      props: {
          banners:{
            type: Array,
          }
      }
    }
</script>


<style scoped>

</style>
