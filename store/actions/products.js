import axios from "axios";

import Product from "../../models/product";

export const DELETE_PRODUCT = "DELETE_PRODUCT";
export const CREATE_PRODUCT = "CREATE_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const SET_PRODUCT = "SET_PRODUCT";

export const fetchProducts = () => {
  return async (dispatch, getState) => {
    const userId = getState().auth.userId;

    try {
      const response = await axios.get(
        "https://rn-shop-10c99-default-rtdb.europe-west1.firebasedatabase.app/products.json",
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      const resData = response.data;

      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            resData[key].ownerId,
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
        userProducts: loadedProducts.filter((prod) => prod.ownerID === userId),
      });
    } catch (error) {
      throw error;
    }
  };
};

export const deleteProduct = (id) => {
  return async (dispatch, getState) => {
    //Async code can be executed here
    const token = getState().auth.token;

    try {
      const response = await axios.delete(
        `https://rn-shop-10c99-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`
      );

      dispatch({
        type: DELETE_PRODUCT,
        productId: id,
      });
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };
};

export const createProduct = (title, description, imageUrl, price) => {
  return async (dispatch, getState) => {
    //Async code can be executed here
    const token = getState().auth.token;
    const userId = getState().auth.userId;

    const data = JSON.stringify({
      title,
      description,
      imageUrl,
      price,
      ownerId: userId,
    });

    try {
      const response = await axios.post(
        `https://rn-shop-10c99-default-rtdb.europe-west1.firebasedatabase.app/products.json?auth=${token}`,
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
          ownerId: userId,
        },
      });
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  //We have access to getState thanks to redux-thunk
  return async (dispatch, getState) => {
    //Async code can be executed here

    const token = getState().auth.token;

    try {
      const response = await axios.patch(
        `https://rn-shop-10c99-default-rtdb.europe-west1.firebasedatabase.app/products/${id}.json?auth=${token}`,
        {
          title,
          description,
          imageUrl,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      dispatch({
        type: UPDATE_PRODUCT,
        productId: id,
        productData: {
          title, //title: title is the same as just using title
          description,
          imageUrl,
        },
      });
    } catch (error) {
      // handle error
      alert(error.message);
    }
  };
};
