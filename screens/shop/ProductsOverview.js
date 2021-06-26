import React from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/ProductItem";
import * as cartActions from "../../store/actions/cart";
import Colors from "../../constants/Colors";

const ProductsOverview = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const { navigation } = props;

  const dispatch = useDispatch();

  const onViewDetailHandler = (item) => {
    navigation.navigate("Details", { product: item });
  };

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onSelect={() => {
            onViewDetailHandler(itemData.item);
          }}
        >
          <Button
            color={Colors.primary}
            title="View Details"
            onPress={() => onViewDetailHandler(itemData.item)}
          />
          <Button
            color={Colors.primary}
            title="To Cart"
            onPress={() => {
              dispatch(cartActions.addToCart(itemData.item));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default ProductsOverview;
