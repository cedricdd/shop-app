import PRODUCTS from "../../data/dummy-data";

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
  return state;
};

export default productReducer;
