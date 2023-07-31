import { createSlice } from "@reduxjs/toolkit";
const initialState={
    filteredItems:[]
};

const filterSlice=createSlice({
    name:"filter",
    initialState,
    reducers:{
        filterItems:(state,action)=>{
            state.filteredItems=action.payload;
        }
    }
})
export const {filterItems}=filterSlice.actions;
export default filterSlice;