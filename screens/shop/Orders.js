import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import OrderItem from "../../components/OrderItem";

const Orders = (props) => {
  const orders = useSelector((state) => state.orders.orders);

  return (
    <FlatList
      data={orders}
      renderItem={(itemData) => <OrderItem order={itemData.item} />}
    />
  );
};

export default Orders;
