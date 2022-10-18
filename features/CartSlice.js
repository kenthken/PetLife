import { createSlice } from '@reduxjs/toolkit'

export const cartTotal = createSlice({
    name: 'cartTotal',
    initialState: {
        value: [],
        total: 0,
        checkout: false
    },
    reducers: {
        setCartTotal: (state, action) => {
            state.value = [...state.value,action.payload]
        },
        updateCartTotal: (state, action) =>{
            let cart = [...state.value]
            console.log("action", action.payload[0]);
            const id = cart.findIndex(res => res.productId === action.payload[0]) 
            const quantity = action.payload [1]
            console.log("updatee",id, quantity);
            state.value[id] = {...cart[id], quantity: quantity};
            // state.cart = state.cart.map(cart=>{
            //     cart.id === id? {...state.cart, quantity: quantity}:cart
            // })
        },
        delCartTotal: (state, action) =>{
            console.log("action",action.payload);
             state.value = state.value.filter((cart) =>cart.productId !== action.payload)
        },
        setTotal: (state, action) =>{
            state.total = state.total + action.payload
        },
        delTotal: (state, action) =>{
            state.total = state.total + action.payload
        },
        setCheckoutAll: (state, action) =>{
            state.checkout = action.payload
        }
    }
})



export const { setCartTotal, delCartTotal, setTotal, setCheckoutAll,updateCartTotal } = cartTotal.actions
export const selectCartTotal = (state) => state.cartTotal.value
export const selectTotal = (state) => state.cartTotal.total
export const selectCheckoutAllStatus = (state) => state.cartTotal.checkout
export default cartTotal.reducer
