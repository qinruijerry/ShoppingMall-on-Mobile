<template>
  <div id="detail">
    <detail_navbar class="navbar" @navItemClick="chosenPart" ref="navbar"></detail_navbar>
    <scroll class="scroll" ref="scroll" @scroll="tabSync" :probeNum="3">
      <detail_swiper :image="swiperImg"></detail_swiper>
      <detail-base-info :goods="goodsInfo"></detail-base-info>
      <detail-shop-info  :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="goodsDetail" @imgLoaded="scrollRefresh"></detail-goods-info>
      <detail-param-info ref="param" :paramInfo="goodsParams"></detail-param-info>
      <detail-comment-info ref="comment" :commentInfo="commentInfo"></detail-comment-info>
      <good-list ref="recommend" :goodListData="recommendList"></good-list>
<!--      <detail-recommend-info :recommend-list="recommendList"></detail-recommend-info>-->
    </scroll>
    <detail-bottom-bar @addToCart="toCart"></detail-bottom-bar>
    <back-top @click.native="topClick" v-show="isShow"></back-top>
<!--    <toast></toast>-->


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
  import DetailBottomBar from "./DetailComponents/DetailBottomBar"
  // import DetailRecommendInfo from './DetailComponents/DetailRecommendInfo'
  import GoodList from "components/content/goodList/GoodList"
  import scroll from "components/common/scroll/Scroll"
  // import toast from "components/common/toast/Toast"

  import {debounce} from "../../common/utils";
  import {backTopMixin} from "../../common/mixin.js"

  import {mapActions} from "vuex"

  import {getDetails,getRecommends, Goods, Shop, Params} from "network/detail.js"





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
        GoodList,
        DetailBottomBar,

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
            recommendList: [],
            partY: [],
            locateTo: null,
            aboveIndexList: [],
            currentIndex:0,
            matchItem: null
          }
      },
      mixins: [backTopMixin],

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
          };

          getRecommends().then((res => {
            this.recommendList = res.data.list
          }))
        })

        this.locateTo = debounce(() => {
          this.partY.push(0)
          this.partY.push(this.$refs.param.$el.offsetTop)
          this.partY.push(this.$refs.comment.$el.offsetTop)
          this.partY.push(this.$refs.recommend.$el.offsetTop)
          // console.log(this.partY)
        }, 100)

        this.matchItem = debounce((positionY) => {
          let flag =false;
          for(let i=0; i<this.partY.length; i++) {
            if(positionY <= this.partY[i]){
              this.aboveIndexList.push(i);
              flag = true
            }
          }
          // console.log(this.aboveIndexList[0])
          if(flag === false){
            this.$refs.navbar.currentIndex = this.partY.length-1
            console.log(this.partY.length)
          } else {
            console.log(this.aboveIndexList[0] -1);
            this.$refs.navbar.currentIndex = this.aboveIndexList[0] -1;
            this.aboveIndexList = []
          }
        }, 20)
      },

      methods: {
          ...mapActions(["addCart"]),
          scrollRefresh() {
            this.$refs.scroll.scroll.refresh()
            this.locateTo()
          },
        chosenPart(index){
            this.partIndex = index;
          this.$refs.scroll.scroll.scrollTo(0, -this.partY[index], 100)
        },
        tabSync(scrollHeight){
            let positionY = -scrollHeight.y;
            this.matchItem(positionY)
          // use function debounce
          //   let flag =false
          //   for(let i=0; i<this.partY.length; i++) {
          //     if(positionY <= this.partY[i]){
          //       this.aboveIndexList.push(i)
          //       flag = true
          //     }
          //   }
          // // console.log(this.aboveIndexList[0])
          // if(flag === false){
          //   this.$refs.navbar.currentIndex = this.partY.length-1
          //   // console.log(this.partY.length)
          // } else {
          //   this.$refs.navbar.currentIndex = this.aboveIndexList[0] -1;
          //   this.aboveIndexList = []
          // }
          // back to function
          this.isShow = (-scrollHeight.y) >= 1000;
        },
        toCart(){
            const product = {};
            product.image = this.swiperImg[0];
            product.title = this.goodsInfo.title;
            product.desc = this.goodsInfo.desc;
            product.price = this.goodsInfo.nowPrice;
            product.iid = this.id;

            this.addCart(product).then(res => {
              this.$toast.show(res)
            })
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
    height: calc(100% - 44px - 58px)
  }
  .navbar {
    position: relative;
    z-index: 9;
    background-color: #ffffff;
  }


</style>
