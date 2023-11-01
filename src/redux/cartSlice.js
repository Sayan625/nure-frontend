import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  total: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    //setting cart
    setCart: (state,action)=>{
        state.items=action.payload
        
    },
    //adding to cart
    addItem: (state, action) => {
      const newItem = action.payload
      state.items.push(newItem)
      state.total += newItem.price
    },
    // removing from cart
    removeItem: (state, action) => {
        const id = action.payload;
        state.items=state.items.filter((item) => item._id !== id)

    },
    // clearing the cart
    clearCart: (state) => {
      state.items = []
      state.total = 0
    },
  },
});

export const { addItem, removeItem, clearCart,setCart } = cartSlice.actions
export default cartSlice.reducer;
