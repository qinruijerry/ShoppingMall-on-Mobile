<template>
  <swiper class="swiperItem">
    <swiper-item v-for="item in image">
      <img :src="item">
    </swiper-item>
  </swiper>

</template>


<script>
  import { Swiper, SwiperItem} from "components/common/swiperbar/index.js"
    export default {
        name: "Detail_swiper",
      components : {
        Swiper, SwiperItem
      },
      props: {
          image: {
            type: Array,
            default(){
              return []
            }
          }
      }
    }
</script>


<style scoped>
  .swiperItem {
    height: 290px;
    overflow: hidden;
  }

</style>
