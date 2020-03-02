import {ADD_NEW, ADD_ITEM_AMOUNT} from "./mutation-types"

export default  {
  addCart(context, payload){
    return new Promise((resolve, reject) => {
      let oldProduct = null;
      for(let item of context.state.cartList){
        if(item.iid === payload.iid){
          oldProduct = item;
        }
      }
      if(oldProduct){
        resolve("商品数量+1")
        context.commit(ADD_ITEM_AMOUNT, oldProduct)
      } else {
        resolve("加入购物车")
        payload.count = 1;
        context.commit(ADD_NEW, payload)
      }
    })
  }
}
