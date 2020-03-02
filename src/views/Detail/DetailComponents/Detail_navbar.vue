<template>
  <div>
    <nav-bar>
      <div class="navbarItem" slot="centernav" >
        <div v-for="(item, index) in navbarList" class="item" @click="listClick(index)" :class="{active: currentIndex === index}">{{item}}</div>
      </div>
      <div slot="leftnav" class="back" @click="goBack">
        <img src="~assets/img/common/back.svg">
      </div>
    </nav-bar>

  </div>
</template>


<script>
  import NavBar from "components/common/navbar/NavBar"

    export default {
        name: "Detail_navbar",
      components: {
          NavBar,
      },
      data(){
          return{
            navbarList: ["商品", "参数", "评论", "推荐"],
            currentIndex: 0
          }
      },
      methods: {
          listClick(index) {
            this.currentIndex = index;
            this.$emit("navItemClick", index)
          },
        goBack() {
            this.$router.go(-1)
        }
      }
    }
</script>


<style scoped>
  .navbarItem {
    display: flex;
    text-align: center;
  }
  .item {
    flex: 1
  }
  .active {
    color: var(--color-high-text)
  }
  .back img{
    /*position: relative;*/
    margin-top:10px;
    margin-left: 5px;
  }


</style>
