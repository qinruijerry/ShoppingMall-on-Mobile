<template>
  <div class="recommends">
    <div v-for="item in recommends" class="recommendsItem">
      <a :href="item.link">
      <img :src="item.image">
    </a>
      <div>{{item.title}}</div>
    </div>
  </div>
</template>


<script>
    export default {
        name: "HomeCommend",
      props: {
          recommends: {
            type: Array,
            default(){
              return {}
            }
          }
      }
    }
</script>


<style scoped>
  .recommends {
    display: flex;

  }
  .recommendsItem {
    flex: 1;
    text-align: center;
    font-size: 12px;
    padding: 10px 0px 15px;
    border-bottom: solid 8px #f6f6f6;
  }
  .recommendsItem img{
    weight: 70px;
    height: 70px;
    margin-bottom: 10px
  }
</style>
