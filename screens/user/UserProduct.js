import React from "react";
import { FlatList, StyleSheet, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/ProductItem";
import Colors from "../../constants/Colors";
import { deleteProduct } from "../../store/actions/products";

const UserProducts = (props) => {
  const userProducts = useSelector((state) => state.products.userProducts);

  const dispatch = useDispatch();

  return (
    <FlatList
      data={userProducts}
      renderItem={(itemData) => (
        <ProductItem product={itemData.item} onSelect={() => {}}>
          <Button color={Colors.primary} title="Edit" onPress={() => {}} />
          <Button
            color={Colors.primary}
            title="Delete"
            onPress={() => {
              dispatch(deleteProduct(itemData.item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProducts;
