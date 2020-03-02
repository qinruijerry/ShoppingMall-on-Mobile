<template>
  <div id="cart">
    <navbar class="navbar"><div slot="centernav">购物车({{listLength}})</div></navbar>
    <cart-list></cart-list>

  </div>
</template>


<script>
  import navbar from "components/common/navbar/NavBar"
  import CartList from "./CartComponents/CartList"


  import {mapGetters} from "vuex"

  export default {
    name: "Shopping_Cart",
    components: {
      navbar,
      CartList,

    },
    computed: {
      ...mapGetters([
        "listLength",
        ]
      )
    }
  }
</script>


<style scoped>
  .navbar {
    background: var(--color-tint);
    color: #ffffff;
  }

</style>
