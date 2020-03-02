<template>
  <div class="payment">
    <div class="check-region">
      <check-button class="check-button"
                    :is-checked="selectAll" @click.native="chooseAll"></check-button>
      <span class="check-text">全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice()}}
    </div>
    <div class="confirm" @click="pay">
      结算:共{{confirmNum}}件
    </div>
  </div>
</template>


<script>
  import CheckButton from "components/content/checkBotton/CheckButton"
  import {CHOOSE_ALL, CANCEL_ALL} from "../../../store/mutation-types"
    export default {
        name: "PaymentBar",
      components: {
          CheckButton
      },
      computed: {
        confirmNum(){
          return this.$store.state.cartList.filter(item => item.checked).length
        },
        selectAll() {
          if(!this.$store.state.cartList.length){
            return false
          } else{
            return !(this.$store.state.cartList.filter(item => !item.checked).length)
          }

        }
      },
      methods: {
          totalPrice(){
            return "￥" + this.$store.state.cartList.filter(item => item.checked).reduce((preValue, item) =>{
              return preValue + item.price * item.count
            }, 0).toFixed(2)
          },
        chooseAll(){
            if(this.selectAll){
              this.$store.commit(CANCEL_ALL)
            } else{
              this.$store.commit(CHOOSE_ALL)
            }
        },
        pay(){
            if(this.confirmNum === 0){
              this.$toast.show("还未添加商品")
            }

        }
      }
    }
</script>


<style scoped>
  .payment {
    display: flex;
    height: 40px;
    background-color: #eee;
    position: relative;
    line-height: 40px;
    /*bottom:40px*/
  }
  .check-region {
    /*line-height: 40px;*/
    display:flex;
    align-items: center;
    width: 80px
  }
  .check-button {
    height: 20px;
    width:20px;
    line-height: 20px;
    margin-left: 5px;
  }
  .check-text {
    margin-left: 5px;
    font-size: 15px;
  }
  .price {
    /*width:100px;*/
    flex: 1;
    text-align: center;
  }
  .confirm {
    width: 120px;
    text-align: center;
    color: white;

    background-color: var(--color-tint);
  }


</style>
