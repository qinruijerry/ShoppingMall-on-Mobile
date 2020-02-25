<template>
  <div class="goods">
    <good-listitem v-for="item in goodListData" :goodsItem="item"></good-listitem>
  </div>
</template>


<script>
  import GoodListitem from "./GoodListItem"
    export default {
        name: "GoodList",
      components: {
          GoodListitem
      },
      // data() {
      //     page = good
      // },

      props: {
        goodListData: {
          type: Array,
          default(){
            return []
          }
        }
      }

    }
</script>


<style scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    padding: 2px;
  }


</style>
