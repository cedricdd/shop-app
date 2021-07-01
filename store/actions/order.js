import axios from "axios";

import Order from "../../models/order";

export const ADD_ORDER = "ADD_ORDER";
export const SET_ORDER = "SET_ORDER";

export const fetchOrders = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await axios.get(
        `https://rn-shop-10c99-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json`,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = response.data;

      const loadedOrders = [];
      for (const key in resData) {
        loadedOrders.push(
          new Order(
            key,
            resData[key].cartItems,
            resData[key].totalAmount,
            new Date(resData[key].date)
          )
        );
      }

      dispatch({
        type: SET_ORDER,
        orders: loadedOrders,
      });
    } catch (error) {
      throw error;
    }
  };
};

export const addOrder = (cartItems, totalAmount) => {
  return async (dispatch, getState) => {
    const date = new Date();
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    try {
      const response = await axios.post(
        `https://rn-shop-10c99-default-rtdb.europe-west1.firebasedatabase.app/orders/${userId}.json?auth=${token}`,
        {
          cartItems,
          totalAmount,
          date: date.toISOString(),
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = response.data;

      dispatch({
        type: ADD_ORDER,
        orderData: {
          id: resData.name,
          items: cartItems,
          amount: totalAmount,
          date: date,
        },
      });
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };
};
