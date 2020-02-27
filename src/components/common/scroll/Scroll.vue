<template>
  <div ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>


<script>
  import BScroll from "better-scroll"

    export default {
        name: "Scroll",
      data(){
          return {
            scroll: null,
          }
      },
      props: {
        probeNum: {
          type: Number,
          default: 0
        },
        pullUp: {
          type: Boolean,
          default: false
        }
      },
      mounted() {
          this.scroll = new BScroll(this.$refs.wrapper, {
            // probeType: this.probeNum,
            click: true,
            pullUpLoad: this.pullUp,

          })

        this.scroll.on("scroll", (position) => {
          this.$emit("scroll", position)
        })

        this.scroll.on("pullingUp", () => {
          console.log("Loading")
          this.$emit("loadContent")
          // this.scroll.finishPullUp()
          // setTimeout(function(){
          //   this.scroll.finishPullUp()
          // },2000)
        })


      },
      methods: {
          scrollTop(x, y, time=500) {
            this.scroll.scrollTo(x, y, time)
          },
        finishPullUp(){
            this.scroll.finishPullUp()
        },
        scrollRefresh(){
          this.scroll && this.scroll.refresh();
          console.log("refreshing")
        },
      }


    }
</script>


<style scoped>

</style>
