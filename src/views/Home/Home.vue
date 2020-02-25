<template>
  <div id="home">
    <navbar class="home-nav"><div slot="centernav">购物街</div></navbar>
    <home-swipper :banners="banners"></home-swipper>
    <home-commends :recommends="recommends"></home-commends>
    <home-feature></home-feature>
    <tab-control :tabControlTags="['流行', '新款', '精选']" class="tabControl"></tab-control>
    <good-list :goodListData="goods['pop'].list"></good-list>
    <ul>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
      <li>placeholder</li>
    </ul>
  </div>
</template>


<script>

  import HomeSwipper from "./HomeComponents/HomeSwipper";
  import HomeCommends from "./HomeComponents/HomeCommends";
  import HomeFeature from "./HomeComponents/HomeFeature";

  import navbar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl"
  import GoodList from "components/content/goodList/GoodList"

  import {getMultidata, getGoods} from "../../network/home";


  export default {
    name: "Home",
    components: {
      navbar, HomeSwipper, HomeCommends,HomeFeature, TabControl, GoodList
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          "pop": {page: 0, list: []},
          "new": {page: 0, list: []},
          "sell": {page: 0, list: []}
        }
      }
    },
    created() {
      this.getMultidata();
      this.getGoodsData("pop");
      this.getGoodsData("new");
      this.getGoodsData("sell")


    },
    methods: {
      getMultidata() {
        getMultidata().then((result) => {
          // console.log(result)
          this.banners = result.data.banner.list;
          this.recommends = result.data.recommend.list;
        })
      },
      getGoodsData(type) {
        let page = this.goods[type].page + 1;
        getGoods(type, page).then(result => {
          // console.log(result.data.list)
          this.goods[type].list.push(...result.data.list);
          this.goods[type].page += 1
        })
      }
    }
  }
</script>


<style scoped>
  #home {
    margin-top: 44px
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    position: fixed;
    left: 0;
    right: 0;
    top: 0;

    z-index: 9;

  }
  .tabControl {
    position: sticky;
    top: 44px;
  }


</style>
