<template>
  <div class="tab_bar_item" @click="itemclick">
      <div v-if="!isActive"><slot name="tabbar_item_icon"></slot></div>
      <div v-else><slot name="tabbar_item_icon_active"></slot></div>
      <div :style="isActiveColor"><slot name="tabbar_item_text"></slot></div>
  </div>
</template>


<script>

  export default {
    name: "tabbar_item",
    data(){
      return {
        // isActive: true,
      }
    },
    props: {
      link: {
        type: String
      },
      ActiveColor: {
        type: String,
        default: "#d4237a"
      }

    },
    computed: {
      isActive(){
        // console.log(this.$route.path);
        // return (this.$route.path.indexOf(this.link) !== -1)
        return (this.$route.path === this.link)
      },

      isActiveColor(){
        if(this.isActive){
          // console.log(this.ActiveColor);
          return {color: this.ActiveColor}
        } else {
          return {}
        }
      }
    },
    methods: {
      // item_click(){
      //   this.isActive = !this.isActive;
      //   this.$emit("child_click", this.isActive)
      // },
      itemclick() {
        this.$router.push(this.link);
        console.log(this.$route.path)
        // console.log(this.link)
      },



    }

  }
</script>



<style scoped>
  .tab_bar_item {
    flex: 1;
    text-align: center;
    height: 49px;
  }


  .tab_bar_item img {
    height: 24px;
    width: 24px;
    margin-top: 3px;
    vertical-align: middle;
  }
  /*.active {*/
  /*  color: #d4237a;*/
  /*}*/


</style>
