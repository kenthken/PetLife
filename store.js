import { configureStore } from '@reduxjs/toolkit'
import { cartTotal } from './features/CartSlice'
import { username } from './features/CounterSlice'
import { navBar } from './features/NavBarSlice'
import { productData } from './features/productSlice'
export default configureStore({
  reducer: {
    username : username.reducer,
    productData : productData.reducer,
    navBar : navBar.reducer,
    cartTotal: cartTotal.reducer
  }
})