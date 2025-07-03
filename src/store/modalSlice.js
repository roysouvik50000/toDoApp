import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isOpen: false,
}

export const modalSlice = createSlice({
    name:'modal',
    initialState,
    reducers:{
        modalHandelar : (state)=>{
            state.isOpen = !state.isOpen;
        }
    }
})

export const {modalHandelar} = modalSlice.actions;

export default modalSlice.reducer;