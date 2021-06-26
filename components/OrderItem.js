import React, { useState } from "react";
import { StyleSheet, View, Text, Button, Platform } from "react-native";

import CartItem from "./CartItem";
import Colors from "../constants/Colors";

const OrderItem = (props) => {
  const { order } = props;
  const [showDetails, setShowDetails] = useState(false);

  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.amount}>${order.totalAmount.toFixed(2)} </Text>
        <Text style={styles.date}>{order.textDate}</Text>
      </View>
      <Button
        title={showDetails ? "Hide Details" : "Show Details"}
        color={Colors.primary}
        onPress={() => {
          setShowDetails((prevState) => !prevState);
        }}
      />
      {showDetails && (
        <View style={styles.itemDetail}>
          {order.items.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    borderRadius: 10,
    backgroundColor: "white",
    margin: 20,
    overflow: "hidden",
    alignItems: "center",
    padding: 10,
  },
  summary: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },
  amount: {
    fontSize: 18,
  },
  date: {
    fontSize: 16,
    color: "#ccc",
  },
  itemDetail: {
    width: "100%",
  },
});

export default OrderItem;
