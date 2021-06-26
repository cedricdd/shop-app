import PRODUCTS from "../../data/dummy-data";
import { DELETE_PRODUCT } from "../actions/products";

const initState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((product) => {
    if (product.ownerID === "u1") {
      return true;
    } else {
      return false;
    }
  }),
};

const productReducer = (state = initState, action) => {
  switch (action.type) {
    case DELETE_PRODUCT:
      return {
        ...state,
        availableProducts: state.availableProducts.filter(
          (product) => product.id !== action.productId
        ),
        userProducts: state.userProducts.filter(
          (product) => product.id !== action.productId
        ),
      };
    default:
      return state;
  }
};

export default productReducer;
