import { createSlice } from '@reduxjs/toolkit'

export const productData = createSlice({
    name: 'productData',
    initialState: {
        value: []
    },
    reducers: {
        setProductData: (state, action) => {
            state.value = action.payload
        },

    }
})



export const { setProductData } = productData.actions
export const selectProduct = (state) => state.productData.value
export default productData.reducer
