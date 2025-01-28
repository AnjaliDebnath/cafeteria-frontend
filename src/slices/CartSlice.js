import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [], 
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem: (state, action) => {
      const item = action.payload;
      const existingItem = state.items.find((i) => i._id === item._id);
      if (existingItem) {
        existingItem.quantity += 1; 
      } else {
        state.items.push(item); 
      }
    },
    removeItem: (state, action) => {
      const itemId = action.payload;
      const existingItem = state.items.find((i) => i._id === itemId);
      if (existingItem.quantity > 1) {
        existingItem.quantity -= 1; 
      } else {
        state.items = state.items.filter((i) => i._id !== itemId); 
      }
    },
    setCart: (state, {payload}) => {
      state.items= payload.cart;
    },
    
  },
});

export const { addItem, removeItem , setCart, } = cartSlice.actions;

export default cartSlice.reducer;
