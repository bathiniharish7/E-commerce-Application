import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./cartSlice/cartSlice"
import filterReducer from "./filterSlice/filterSlice"

export const store = configureStore({
  reducer: {
    cart:cartReducer,
    // filters:filterReducer
  },
})