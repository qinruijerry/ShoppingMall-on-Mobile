<template>
  <div class="cart-list">
    <scroll class="content">
      <cart-list-item v-for="item in cartList" :item-info="item"></cart-list-item>
    </scroll>
    <payment-bar></payment-bar>

  </div>
</template>


<script>
  import scroll from "components/common/scroll/Scroll"
  import cartListItem from "./CartListItem"
  import PaymentBar from "./PaymentBar"

  import { mapGetters } from "vuex"


  export default {
        name: "CartList",
    components: {
      scroll,
      cartListItem,
      PaymentBar
    },
      computed: {
          ...mapGetters([
            'cartList'
          ])
      }
    }
</script>


<style scoped>
  .cart-list{
    height: 100vh
  }
  .content {
    height: calc(100% - 44px - 49px - 40px);
    overflow: hidden;
  }

</style>
