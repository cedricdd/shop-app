import axios from "axios";

import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
  return async (dispatch) => {
    let resData;

    try {
      const response = await axios.get(
        "https://rn-shop-10c99-default-rtdb.europe-west1.firebasedatabase.app/products.json",
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      resData = response.data;
    } catch (error) {
      // handle error
      alert(error.message);
      return;
    }

    const loadedProducts = [];
    for (const key in resData) {
      loadedProducts.push(
        new Product(
          key,
          "u1",
          resData[key].title,
          resData[key].imageUrl,
          resData[key].description,
          resData[key].price
        )
      );
    }

    dispatch({
      type: SET_PRODUCT,
      products: loadedProducts,
    });
  };
};

export const deleteProduct = (id) => {
  return { type: DELETE_PRODUCT, productId: id };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch) => {
    //Async code can be executed here
    const data = JSON.stringify({
      title,
      description,
      imageUrl,
      price,
    });

    try {
      const response = await axios.post(
        "https://rn-shop-10c99-default-rtdb.europe-west1.firebasedatabase.app/products.json",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = response.data;

      dispatch({
        type: CREATE_PRODUCT,
        productData: {
          id: resData.name,
          title, //title: title is the same as just using title
          description,
          imageUrl,
          price,
        },
      });
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return {
    type: UPDATE_PRODUCT,
    productId: id,
    productData: {
      title, //title: title is the same as just using title
      description,
      imageUrl,
    },
  };
};
