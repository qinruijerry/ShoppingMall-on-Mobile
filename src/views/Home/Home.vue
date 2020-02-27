<template>
  <div id="home">
    <navbar class="home-nav"><div slot="centernav">购物街</div></navbar>

    <scroll class="scrollContent" ref="scroll" @scroll="scrollPosition" @loadContent="scrollLoad" :pull-up="true">
      <home-swipper :banners="banners"></home-swipper>
      <home-commends :recommends="recommends"></home-commends>
      <home-feature></home-feature>
      <tab-control :tabControlTags="['流行', '新款', '精选']" class="tabControl" @tabControlClick="getGoodsType"></tab-control>
      <goods-list :goodListData="goodsType"></goods-list>
    </scroll>

    <back-top @click.native="topClick" v-show="isShow"></back-top>


  </div>
</template>


<script>

  import HomeSwipper from "./HomeComponents/HomeSwipper";
  import HomeCommends from "./HomeComponents/HomeCommends";
  import HomeFeature from "./HomeComponents/HomeFeature";

  import navbar from "components/common/navbar/NavBar";
  import TabControl from "components/content/tabControl/TabControl"
  import GoodsList from "components/content/goodList/GoodList"
  import Scroll from "components/common/scroll/Scroll"
  import BackTop from "components/content/backTop/BackTop"

  import {getMultidata, getGoods} from "../../network/home";


  export default {
    name: "Home",
    components: {
      navbar, HomeSwipper, HomeCommends,HomeFeature, TabControl, GoodsList, Scroll, BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          "pop": {page: 0, list: []},
          "new": {page: 0, list: []},
          "sell": {page: 0, list: []}
        },
        currentType: "pop",
        isShow : false,
      }
    },
    computed: {
      goodsType(){
        return this.goods[this.currentType].list
      }
    },
    created() {
      this.getMultidata();
      this.getGoodsData("pop");
      this.getGoodsData("new");
      this.getGoodsData("sell");

    },

    mounted() {
      const refresh = this.debounce(this.$refs.scroll.scrollRefresh, 200);
      this.$bus.$on("imgLoaded", () => {
        console.log("imgLoaded");
        refresh()
      })
    },
    methods: {
      debounce(func, delay){
        let timer = null;
        return function(...args){
          if(timer) {clearTimeout(timer)}
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },
      getGoodsType(index){
        switch(index) {
          case 0:
            this.currentType = 'pop'
                break
          case 1:
            this.currentType = 'new'
                break
          case 2:
            this.currentType = 'sell'
                break
        }

      },

      // get server's data'
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
          this.$refs.scroll.finishPullUp()
        })
      },
      topClick(){
        this.$refs.scroll.scrollTop(0,0)
      },
      scrollPosition(position) {
        // console.log(position)
        // console.log(-position >= 1000)
        this.isShow = (-position.y) >= 1000
      },
      scrollLoad(){
        this.getGoodsData(this.currentType)
      },


    }
  }
</script>


<style scoped>
  #home {
    /*margin-top: 44px;*/
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;

    /*position: fixed;*/
    left: 0;
    right: 0;
    top: 0;

    z-index: 9;

  }
  .tabControl {
    position: sticky;
    top: 44px;
  }

  /*.scrollContent {*/
  /*  height: calc(100% - 90px);*/
  /*  overflow:hidden;*/
  /*  !*position: absolute;*!*/
  /*  !*height: 300px;*!*/
  /*  margin-top: 44px;*/
  /*}*/
  .scrollContent {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }


</style>
