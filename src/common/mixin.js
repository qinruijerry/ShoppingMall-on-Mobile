import BackTop from "components/content/backTop/BackTop"

export const backTopMixin = {
  data(){
    return{
      isShow : false
    }
  },
  components: {
    BackTop
  },
  methods: {
    topClick(){
      this.$refs.scroll.scrollTop(0,0)
    },
  }
}
