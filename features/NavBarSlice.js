import { createSlice } from '@reduxjs/toolkit'

export const navBar = createSlice({
    name: 'navBar',
    initialState: {
        homeIcon:"blue",
        cartIcon:""
    },
    reducers: {
        setHomeIcon: (state, action) => {
            state.homeIcon = action.payload
        },
        setCartIcon:(state, action) =>{
            state.cartIcon = action.payload
        }
    }
})



export const { setHomeIcon } = navBar.actions
export const selectHomeIconColor = (state) => state.navBar.homeIcon
export const { setCartIcon } = navBar.actions
export const selectCartIconColor = (state) => state.navBar.cartIcon
export default navBar.reducer
