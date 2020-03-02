import {ADD_NEW, ADD_ITEM_AMOUNT, CHOOSE_ALL, CANCEL_ALL} from "./mutation-types"

export default {
  [ADD_ITEM_AMOUNT](state, payload){
    payload.count += 1;
  },
  [ADD_NEW](state, payload) {
    payload.checked = true;
    state.cartList.push(payload)
  },
  [CHOOSE_ALL](state) {
    for(let item of state.cartList) {
      item.checked = true
    }
  },
  [CANCEL_ALL](state) {
    for(let item of state.cartList) {
      item.checked = false
    }
  },
}
