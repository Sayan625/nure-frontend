import axios from "axios";
import { apiBase } from "./data";

// Get the user's token from local storage, if available
const userToken = JSON.parse(localStorage.getItem('user'))?.token;

// Define custom headers for making authenticated requests
const customHeader = {
  'access_token': `${userToken}`
};

// Function to add a new product
export const AddProduct = async (body) => {
  try {
    const resp = await axios.post(`${apiBase}/products/new?admin=true`, body, {
      headers: customHeader
    });
    return resp.data; // Return the response data
  } catch (error) {
    return {}; // Return an empty object in case of an error
  }
}

// Function to update an existing product by ID
export const UpdateProduct = async (id, body) => {
  try {
    const resp = await axios.put(`${apiBase}/products/update/${id}?admin=true`, body, {
      headers: customHeader
    });

    if (resp.status === 200) {
      return true; // Return true if the response status is 200 (success)
    } else {
      return false; // Return false for other response statuses
    }
  } catch (error) {
    console.log(error);
    return false; // Return false in case of an error
  }
}

// Function to delete a product by ID
export const DeleteProduct = async (id) => {
  try {
    const resp = await axios.delete(`${apiBase}/products/remove/${id}?admin=true`, {
      headers: customHeader
    });

    if (resp.status === 200) {
      return true; // Return true if the response status is 200 (success)
    } else {
      return false; // Return false for other response statuses
    }
  } catch (error) {
    return false; // Return false in case of an error
  }
}
