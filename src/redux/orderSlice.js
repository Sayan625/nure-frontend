
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    history:[],
    current:{}
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    // setting order history
    setOrderHistory: (state,action)=>{
        state.history=action.payload
        
    },
    // setting current order
    setCurrentOrder: (state, action) => {
        state.current={...action.payload}

    },
    // clearing current order
    clearCurrentOrder: (state, action) => {
        state.current={}
    }
  },
});

export const { setOrderHistory, clearCurrentOrder,setCurrentOrder } = orderSlice.actions
export default orderSlice.reducer;
