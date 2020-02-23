<template>

  <tabbar>
    <tab_bar_item link="/home">
      <img src="~assets/img/tabbar/home.svg" slot="tabbar_item_icon">
      <img src="~assets/img/tabbar/home_active.svg" slot="tabbar_item_icon_active">
      <div slot="tabbar_item_text">首页</div>
    </tab_bar_item>
    <tab_bar_item link="/item">
      <img src="~assets/img/tabbar/category.svg" slot="tabbar_item_icon">
      <img src="~assets/img/tabbar/category_active.svg" slot="tabbar_item_icon_active">
      <div slot="tabbar_item_text">分类</div>
    </tab_bar_item>
    <tab_bar_item link="/shopping_cart">
      <img src="~assets/img/tabbar/cart.svg" slot="tabbar_item_icon">
      <img src="~assets/img/tabbar/cart.svg" slot="tabbar_item_icon_active">
      <div slot="tabbar_item_text">购物车</div>
    </tab_bar_item>
    <tab_bar_item link="/profile">
      <img src="~assets/img/tabbar/profile.svg" slot="tabbar_item_icon">
      <img src="~assets/img/tabbar/profile_active.svg" slot="tabbar_item_icon_active">
      <div slot="tabbar_item_text">我的</div>
    </tab_bar_item>
  </tabbar>


</template>


<script>
  import tabbar from "components/common/tabbar/tabbar"
  import tab_bar_item from "components/common/tabbar/tabbar_item"

  export default {
    name: "maintabbar",
    components: {
      tabbar, tab_bar_item
    }

  }
</script>


<style scoped>

</style>
