import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {}
  },
  reducers: {
    addToCart: (state, action) => {
      const productDetails = action.payload;
      const productId = productDetails.id;

      if (state.cartItems[productId]) {
        state.cartItems[productId].quantity += 1;
      } else {
        state.cartItems[productId] = {
          productDetails,
          quantity: 1
        };
      }
    },

    increaseQuantity: (state, action) => {
      const productId = action.payload;
      state.cartItems[productId].quantity += 1;
    },

    decreaseQuantity: (state, action) => {
      const productId = action.payload;

      if (state.cartItems[productId].quantity > 1) {
        state.cartItems[productId].quantity -= 1;
      } else {
        delete state.cartItems[productId];
      }
    },

    // update cart with lates api details
    updateCartProductDetails: (state, action) => {
      const latestProducts = action.payload;

      latestProducts.forEach((product) => {
        const productId = product.id;

        if (state.cartItems[productId]) {
          state.cartItems[productId].productDetails = {
            ...state.cartItems[productId].productDetails,
            ...product
          };
        }
      });
    }
  }
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  updateCartProductDetails
} = cartSlice.actions;

export default cartSlice.reducer;
