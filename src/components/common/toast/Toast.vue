<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>


<script>
    export default {
        name: "Toast",
      data(){
          return {
            message: '默认消息',
            isShow: false
          }
      },
      methods: {
          show(message, duration=2000) {
            this.message= message;
            this.isShow = true;
            setTimeout(()=>{
              this.isShow = false;
              this.message = ""
            }, duration)
          }
      }
    }
</script>


<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    padding: 18px 20px;
    color: white;

    background: rgba(0,0,0,.75);

    z-index: 10;
  }

</style>
