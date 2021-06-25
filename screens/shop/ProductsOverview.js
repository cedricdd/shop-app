import React from "react";
import { FlatList } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import ProductItem from "../../components/ProductItem";
import * as cartActions from "../../store/actions/cart";

const ProductsOverview = (props) => {
  const products = useSelector((state) => state.products.availableProducts);
  const { navigation } = props;

  const dispatch = useDispatch();

  return (
    <FlatList
      data={products}
      renderItem={(itemData) => (
        <ProductItem
          product={itemData.item}
          onViewDetail={() =>
            navigation.navigate("Details", { product: itemData.item })
          }
          onAddToCart={() => {
            dispatch(cartActions.addToCart(itemData.item));
          }}
        />
      )}
    />
  );
};

export default ProductsOverview;
