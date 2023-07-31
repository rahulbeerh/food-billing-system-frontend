import { createSlice } from "@reduxjs/toolkit";

const initialState = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : { cartItems: [] , cartTotal:0 , cartCount:0 };

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const item = action.payload;
      const existingItem = state.cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        state.cartItems = state.cartItems.map((cartItem) =>
          cartItem._id === existingItem._id ? item : cartItem
        );
      } else {
        state.cartItems = [
          ...state.cartItems,
          { ...item, quantity: item.quantity },
        ];
      }
      state.cartTotal=state.cartItems.reduce((total,cartItem)=>total+cartItem.price*cartItem.quantity,0);
      state.cartCount=state.cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0);
      localStorage.setItem("cart",JSON.stringify(state));
      return state;
    },
    removeFromCart:(state,action)=>{
      const item=action.payload;
      state.cartItems=state.cartItems.filter((cartItem)=>cartItem._id!==item._id);
      state.cartTotal=state.cartItems.reduce((total,cartItem)=>total+cartItem.price*cartItem.quantity,0);
      state.cartCount=state.cartItems.reduce((total,cartItem)=>total+cartItem.quantity,0);
      localStorage.setItem("cart",JSON.stringify(state));
      return state;
    },
    clearCart:(state,action)=>{
      state.cartItems=[];
      state.cartTotal=0;
      state.cartCount=0;
      localStorage.removeItem("cart");
    }
  },
});
export const { addToCart ,removeFromCart,clearCart} = cartSlice.actions;
export default cartSlice;
