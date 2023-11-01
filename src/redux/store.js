
import { combineReducers } from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import orderReducer from './orderSlice';
import userReducer from './userSlice';

// all reducers combined
const rootReducer = combineReducers({
  cart: cartReducer,
  order: orderReducer,
  user: userReducer,
});

// global store
const store = configureStore({
  reducer: rootReducer,
});

export default store;

