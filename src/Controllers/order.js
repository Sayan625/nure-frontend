import axios from "axios";
import { EmptyCart } from "./cart";
import { apiBase } from "./data";

// Get the user's access token from local storage
const userToken = JSON.parse(localStorage.getItem('user'))?.token;

// Create a custom header with the access token
const customHeader = {
  'access_token': `${userToken}`
}

// Function to get the user's order history
export const GetOrderHistory = async () => {
  const resp = await axios.get(`${apiBase}/orders`, { headers: customHeader });
  return resp.data;
}

// Function to get a specific order by its ID
export const GetOrderHistoryById = async (id) => {
  const resp = await axios.get(`${apiBase}/orders/${id}`, { headers: customHeader });
  return resp.data;
}

// Function to place an order
export const PlaceOrder = async (body) => {
  // Check if the order amount or products list is empty; do not place an empty order
  if (body.amount === 0 || body.products.length === 0) {
    return;
  }

  try {
    // Make a POST request to create a new order
    await axios.post(`${apiBase}/orders`, body, { headers: customHeader });

    // Empty the user's cart after placing the order
    await EmptyCart();
  } catch (error) {
    console.log(error);
  }
}
