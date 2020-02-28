<template>
  <div id="detail">
    <detail_navbar class="navbar"></detail_navbar>
    <scroll class="scroll" ref="scroll">
      <detail_swiper :image="swiperImg"></detail_swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info  :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="goodsDetail" @imgLoaded="scrollRefresh"></detail-goods-info>
      <detail-param-info :paramInfo="goodsParams"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo"></detail-comment-info>
<!--      <detail-recommend-info :recommend-list="recommendList"></detail-recommend-info>-->
    </scroll>

  </div>
</template>


<script>
  import Detail_navbar from "./DetailComponents/Detail_navbar"
  import Detail_swiper from "./DetailComponents/Detail_swiper"
  import DetailBaseInfo from "./DetailComponents/DetailBaseInfo"
  import DetailShopInfo from "./DetailComponents/DetailShopInfo"
  import DetailGoodsInfo from "./DetailComponents/DetailGoodsInfo"
  import DetailParamInfo from "./DetailComponents/DetailParamInfo"
  import DetailCommentInfo from './DetailComponents/DetailCommentInfo'
  // import DetailRecommendInfo from './DetailComponents/DetailRecommendInfo'
  import scroll from "components/common/scroll/Scroll"

  import {getDetails, Goods, Shop, Params} from "network/detail.js"




    export default {
        name: "Detail",
      components: {
        scroll,
        Detail_navbar,
        Detail_swiper,
        DetailBaseInfo,
        DetailShopInfo,
        DetailGoodsInfo,
        DetailParamInfo,
        DetailCommentInfo,
        // DetailRecommendInfo
      },
      data(){
          return {
            id: null,
            swiperImg: null,
            goodsInfo: {},
            shop: {},
            goodsDetail:{},
            goodsParams: {},
            commentInfo: {},
            // recommendList: [],
          }
      },
      created(){
        this.id = this.$route.params.iid;

        getDetails(this.id).then((res) =>{
            // console.log(res)
            this.swiperImg =res.result.itemInfo.topImages;
          this.goodsInfo = new Goods (res.result.itemInfo,res.result.columns, res.result.shopInfo.services);
          this.shop = new Shop (res.result.shopInfo);
          this.goodsDetail = res.result.detailInfo;
          this.goodsParams = new Params(res.result.itemParams.info, res.result.itemParams.rule);

          if (res.result.rate.list) {
            this.commentInfo = res.result.rate.list[0];
          }
        })
      },
      methods: {
          scrollRefresh() {
            this.$refs.scroll.scroll.refresh()
          }
      }

    }
</script>


<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
    height: 100vh;
  }
  .scroll{
    height: calc(100% - 44px)
  }
  .navbar {
    position: relative;
    z-index: 9;
    background-color: #ffffff;

  }


</style>
