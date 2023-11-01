import axios from "axios";
import { apiBase } from "./data";

// Get the user's token from local storage, if available
const userToken = JSON.parse(localStorage.getItem('user'))?.token;

// Define custom headers for making authenticated requests
const customHeader = {
  'access_token': `${userToken}`
};

// Function to get the user's cart data
export const GetCartData = async () => {
  try {
    const resp = await axios.get(`${apiBase}/user/cart`, {
      headers: customHeader
    });
    return resp.data; // Return the cart data from the response
  } catch (error) {
    return []; // Return an empty array in case of an error
  }
}

// Function to add a product to the user's cart
export const AddToCart = async (body) => {
  try {
    const resp = await axios.post(`${apiBase}/user/cart`, body, {
      headers: customHeader
    });
    // No need to return a value here, as this is mainly an action
  } catch (error) {
    console.log(error); // Log the error if the request fails
  }
}

// Function to remove a product from the user's cart by ID
export const RemoveProduct = async (id) => {
  await axios.delete(`${apiBase}/user/cart?item=${id}`, { headers: customHeader });
}

// Function to empty the user's cart
export const EmptyCart = async () => {
  await axios.delete(`${apiBase}/user/cart?empty=true`, { headers: customHeader });
}
