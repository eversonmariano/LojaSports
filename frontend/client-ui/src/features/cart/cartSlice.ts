import { createSlice, } from "@reduxjs/toolkit";
import { Cartt } from "../../app/models/cart";


interface CartState {
    cart: Cartt | null
}

const initialState: CartState = {
    cart: null
}

export const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{
        setCart: (state, action) =>{
            console.log('new cart state', action.payload);
            state.cart = action.payload
        }
    }
})

export const {setCart} = cartSlice.actions;