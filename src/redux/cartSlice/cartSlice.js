import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: {}
  },
  reducers: {
    addToCart: (state, action) => {
      const productId = action.payload;
      

      if (state.cartItems[productId]) {
        state.cartItems[productId].quantity += 1;
      } else {
        state.cartItems[productId] = {
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

    clearCart: (state) => {
      state.cartItems = {};
    }
  }
});

export const {
  addToCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart
} = cartSlice.actions;

export default cartSlice.reducer;
