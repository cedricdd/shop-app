import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { createStore, combineReducers } from "redux";
import { Provider } from "react-redux";
import { composeWithDevTools } from "redux-devtools-extension";

import productReducer from "./store/reducers/products";
import cartReducer from "./store/reducers/cart";
import orderReducer from "./store/reducers/order";
import ShopNavigator from "./navigation/ShopNavigation";

const rooReducer = combineReducers({
  products: productReducer,
  cart: cartReducer,
  orders: orderReducer,
});

//const store = createStore(rooReducer, composeWithDevTools()); //composeWithDevTools has to be removed before deployment
const store = createStore(rooReducer);

export default function App() {
  return (
    <Provider store={store}>
      <ShopNavigator />
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
