<template>
    <swiper>
      <swiper-item v-for="item in banners">
        <a :href="item.link">
          <img :src="item.image" @load="swiperLoaded">
        </a>
      </swiper-item>
    </swiper>
</template>


<script>
  import {Swiper, SwiperItem} from "components/common/swiperbar/index.js";
    export default {
        name: "HomeSwipper",
      data(){
          return {
            loadCheck: false
          }
      },
      components: {
          SwiperItem, Swiper
      },
      props: {
          banners:{
            type: Array,
          },

      },
      methods: {
        swiperLoaded(){
          if (this.loadCheck === false){
            this.$emit("swiperFinished");
            this.loadCheck = true
          }

        }
      }
    }
</script>


<style scoped>


</style>
