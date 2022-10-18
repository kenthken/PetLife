import { createSlice } from '@reduxjs/toolkit'

export const username = createSlice({
    name: 'username',
    initialState: {
        value: "",
        id:"",
        cart:[],
        detailCart:[],
        temptCart:0,
        cartLength:0
    },
    reducers: {
        setUsername: (state, action) => {
            state.value = action.payload
        },
        setId: (state, action) => {
            state.id = action.payload
        },
        // setCart: (state, action) => {
        //     state.cart = action.payload
        // },
        setCart: (state, action) => {
            state.cart = [...state.cart,action.payload]
        },
        updateCart: (state, action) =>{
            let cart = [...state.cart]
            const id = cart.findIndex(res => res.productId === action.payload[0]) 
            const quantity = action.payload [1]
            console.log("update",id, quantity);
            state.cart[id] = {...cart[id], quantity: quantity};
            // state.cart = state.cart.map(cart=>{
            //     cart.id === id? {...state.cart, quantity: quantity}:cart
            // })
        },
        deleteCart: (state,action)=>{
            let cart = [...state.cart]
            state.cart = cart.filter(cart=> cart.productId != action.payload)
        },
        setDetailCart: (state, action) => {
            state.detailCart = [...state.detailCart, action.payload]
        },
        deleteDetailCart: (state,action)=>{
            let detailCart = [...state.detailCart]
            state.detailCart = detailCart.filter(cart=> cart.id != action.payload)
        },
        setTemptCart: (state, action) => {
            state.temptCart = action.payload
        },
        setCartLength: (state, action) => {
            state.cartLength = action.payload
        }
        
    },
})



// Action creators are generated for each case reducer function
export const { setUsername } = username.actions
export const { setId } = username.actions
export const { setCart } = username.actions
export const { setDetailCart } = username.actions
export const { setTemptCart } = username.actions
export const { setCartLength } = username.actions
export const { updateCart } = username.actions
export const { deleteCart } = username.actions
export const { deleteDetailCart } = username.actions
export const selectUsername = (state) => state.username.value
export const selectId = (state) => state.username.id
export const selectCart = (state) => state.username.cart
export const selectDetailCart = (state) => state.username.detailCart
export const selectTemptCart = (state) => state.username.temptCart
export const selectCartLength = (state) => state.username.cartLength
export default username.reducer
