import { configureStore } from '@reduxjs/toolkit'
import cartReducer from "./cartSlice/cartSlice"
import filterReducer from "./filterSlice/filterSlice"

const loadCartData = () => {
  try {
    const data = localStorage.getItem("Shop-Data")
    return data ? JSON.parse(data) : undefined
  } catch {
    return undefined
  }
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    // filters:filterReducer
  },
   preloadedState: {
    cart: loadCartData() || { cartItems: {} }
  }
})

store.subscribe(() => {
  try {
    const state = store.getState()
    localStorage.setItem("Shop-Data", JSON.stringify(state.cart))
  } catch (e){
    console.log('Something went wrong',e);
    
  }
})