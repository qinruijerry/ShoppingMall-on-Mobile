<template>
  <div class="check-button">
    <img src="~assets/img/cart/tick.svg" :class="{checked: isChecked}">
  </div>
</template>


<script>
    export default {
        name: "CheckButton",
      props: {
          isChecked: {
            type: Boolean,
            default: true,
          }
      }
    }
</script>


<style scoped>
  .check-button{
    border: 2px solid #aaa;
    border-radius: 50%;
    /*align-items: center;*/

  }
  .checked {
    background-color: var(--color-tint);
    border-color: var(--color-tint);
    border-radius: 50%;
  }

</style>
