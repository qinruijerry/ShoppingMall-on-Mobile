<template>
  <div id="home">
    <navbar class="home-nav"><div slot="centernav">购物街</div></navbar>
    <tab-control :tabControlTags="['流行', '新款', '精选']" class="tabControl_t" @tabControlClick="getGoodsType"
                 ref="tabControl_t"
                 v-show="tabbar_isShow"></tab-control>

    <scroll class="scrollContent" ref="scroll" @scroll="scrollPosition" @loadContent="scrollLoad" :pull-up="true">
      <home-swipper :banners="banners" @swiperFinished="loadCheck"></home-swipper>
      <home-commends :recommends="recommends"></home-commends>
      <home-feature></home-feature>
      <tab-control :tabControlTags="['流行', '新款', '精选']" class="tabControl" @tabControlClick="getGoodsType" ref="tabControl_b"></tab-control>
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
  import {debounce } from "../../common/utils";


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
        tabbarTop: 0,
        tabbar_isShow: false,
        saveY : 0,
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


      const refresh = debounce(this.$refs.scroll.scrollRefresh, 200);
      this.$bus.$on("imgLoaded", () => {
        // console.log("imgLoaded");
        refresh()
      })
    },
    activated(){
      this.$refs.scroll.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.scroll.refresh()
    },
    deactivated(){
      this.saveY = this.$refs.scroll.scroll.y
    },
    methods: {

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
        this.$refs.tabControl_t.currentIndex = index;
        this.$refs.tabControl_b.currentIndex = index;
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
          this.goods[type].page += 1;
          this.$refs.scroll.finishPullUp()
        })
      },
      topClick(){
        this.$refs.scroll.scrollTop(0,0)
      },
      scrollPosition(position) {
        // console.log(position)
        // console.log(-position >= 1000)
        this.isShow = (-position.y) >= 1000;

        this.tabbar_isShow = (-position.y) > this.tabbarTop
        // if((-position.y)> this.tabbarTop){
        //   this.tabbar_isShow = true
        // }
      },
      scrollLoad(){
        this.getGoodsData(this.currentType)
      },
      loadCheck() {
        // console.log("img Loaded");
        // console.log(this.$refs.tabControl_b.$el.offsetTop);
        this.tabbarTop = this.$refs.tabControl_b.$el.offsetTop
      }


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

    z-index: 9;

  }
  .tabControl_t {
    /*top: 44px;*/
    position: relative;
    z-index: 1;
    left: 0;
    right: 0;
    top: 0;
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
