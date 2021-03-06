const initState = {
  items: {},
  totalAmount: 0,
};

import CartItem from "../../models/cart-item";
import { ADD_TO_CART, REMOVE_TO_CART } from "../actions/cart";
import { ADD_ORDER } from "../actions/order";
import { DELETE_PRODUCT } from "../actions/products";

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

    case REMOVE_TO_CART:
      const itemToRemove = state.items[action.id];
      let updatedCartItems;

      if (itemToRemove.quantity > 1) {
        updatedCartItems = {
          ...state.items,
          [action.id]: new CartItem(
            itemToRemove.quantity - 1,
            itemToRemove.productPrice,
            itemToRemove.productTitle,
            itemToRemove.sum - itemToRemove.productPrice
          ),
        };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.id]; //Delete from the object
      }

      return {
        //We don't really need ...state since we re-define all the value, for safety we can leave it in case more values are added later
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - itemToRemove.productPrice,
      };

    case ADD_ORDER:
      return initState;

    case DELETE_PRODUCT:
      if (!state.items[action.productId]) {
        return state;
      }

      const sum = state.items[action.productId].sum;
      const updatedItems = { ...state.items };
      delete updatedItems[action.productId];

      return {
        //We don't really need ...state since we re-define all the value, for safety we can leave it in case more values are added later
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - sum,
      };

    default:
      return state;
  }
};

export default cartReducer;
