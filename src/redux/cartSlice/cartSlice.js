import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  products: [],
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart
    addToCart: (state, action) => {
      state.products.push(action.payload);
    },

    // Remove product by ID
    removeFromCart: (state, action) => {
      state.products = state.products.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

// Export actions
export const { addToCart, removeFromCart } = cartSlice.actions;

// Export reducer
export default cartSlice.reducer;
