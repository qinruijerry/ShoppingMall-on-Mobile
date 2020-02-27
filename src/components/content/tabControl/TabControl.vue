<template>
  <div class="tabControl">
    <div v-for="(item,index) in tabControlTags" class="tabControlItem" @click="itemClick(index) " :class="{active: currentIndex === index}">
      <span>{{item}}</span>
    </div>
  </div>
</template>


<script>
    export default {
        name: "TabControl",
      props: {
          tabControlTags: {
            type: Array,
            default() {
              return []
            }
          }
      },
      data() {
          return {
            currentIndex: 0
          }
      },
      methods: {
          itemClick(index){
            this.currentIndex = index;
            this.$emit("tabControlClick", index)
          }
      }
    }
</script>


<style scoped>
  .tabControl {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #f6f6f6;
    font-size: 15px;

    z-index: 9
  }
  .tabControlItem {
    flex: 1;
    text-align: center;
  }

  .active {
    color: var(--color-high-text);


  }
  .active span {
    border-bottom: 3px solid var(--color-high-text);
    padding: 3px
  }

</style>
