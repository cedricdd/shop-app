import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import Colors from "../../constants/Colors";
import CartItem from "../../components/CartItem";
import { removeFromCart } from "../../store/actions/cart";
import { addOrder } from "../../store/actions/order";

const Cart = (props) => {
  const cartTotal = useSelector((state) => state.cart.totalAmount);
  const cartItems = useSelector((state) => {
    const arrayItems = [];
    for (const key in state.cart.items) {
      arrayItems.push({
        id: key,
        title: state.cart.items[key].productTitle,
        price: state.cart.items[key].productPrice,
        quantity: state.cart.items[key].quantity,
        sum: state.cart.items[key].sum,
      });
    }
    return arrayItems.sort((a, b) => (a.id > b.id ? 1 : -1));
  });

  const dispatch = useDispatch();

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.amount}>
          Total: ${Math.round(cartTotal.toFixed(2) * 100) / 100}
        </Text>
        <Button
          title="Order Now!"
          color={Colors.accent}
          disabled={cartItems.length === 0}
          onPress={() => {
            dispatch(addOrder(cartItems, cartTotal));
          }}
        />
      </View>
      <FlatList
        keyExtractor={(item) => item.id}
        data={cartItems}
        renderItem={(itemData) => (
          <CartItem
            item={itemData.item}
            deletable={1}
            onRemove={() => {
              dispatch(removeFromCart(itemData.item.id));
            }}
          />
        )}
      />
    </View>
  );
};

export default Cart;

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    shadowColor: "black",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 6,
    borderRadius: 10,
    backgroundColor: "white",
    marginBottom: 10,
  },
  amount: {
    fontSize: 18,
  },
});
