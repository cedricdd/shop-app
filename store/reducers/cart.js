const initState = {
  items: {},
  totalAmount: 0,
};

import CartItem from "../../models/cart-item";
import { ADD_TO_CART } from "../actions/cart";

const cartReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const product = action.product;
      let cartItem;
      if (state.items[product.id]) {
        cartItem = new CartItem(
          state.items[product.id].quantity + 1,
          product.price,
          product.title,
          state.items[product.id].sum + product.price
        );
      } else {
        cartItem = new CartItem(1, product.price, product.title, product.price);
      }
      return {
        //We don't really need ...state since we re-define all the value, for safety we can leave it in case more values are added later
        ...state,
        items: { ...state.items, [product.id]: cartItem },
        totalAmount: state.totalAmount + product.price,
      };

    default:
      return state;
  }
};

export default cartReducer;
