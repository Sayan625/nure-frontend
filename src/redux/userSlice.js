
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    current:{}
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // setting user
    setUser: (state,action)=>{
        state.current=action.payload
        
        
    },
    // clearing user
    clearUser: (state, action) => {
        state.current={}
    }
  },
});

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer;
