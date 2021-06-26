import { ADD_ORDER } from "../actions/order";
import Order from "../../models/order";

const initState = {
  orders: [],
};

const orderReducer = (state = initState, action) => {
  switch (action.type) {
    case ADD_ORDER:
      const newOrder = new Order(
        new Date().toString(),
        action.orderData.items,
        action.orderData.amount,
        new Date()
      );
      return { ...state, orders: state.orders.concat(newOrder) };
    default:
      return state;
  }
};

export default orderReducer;
