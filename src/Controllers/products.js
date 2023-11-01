import axios from "axios";
import { apiBase } from "./data";

// Get the user's access token from local storage
const userToken = JSON.parse(localStorage.getItem('user'))?.token;

// Create a custom header with the access token
const customHeader = {
  'access_token': `${userToken}`
}

// Function to get all products
export const GetProducts = async () => {
  try {
    const resp = await axios.get(`${apiBase}/products/`);
    return resp.data;
  } catch (error) {
    return [];
  }
}

// Function to get products by category
export const GetProductsByCategory = async (id) => {
  try {
    const resp = await axios.get(`${apiBase}/products/category/${id}`);
    return resp.data;
  } catch (error) {
    return [];
  }
}

// Function to get products by type
export const GetProductsByType = async (type) => {
  try {
    const resp = await axios.get(`${apiBase}/products/type/${type}`);
    return resp.data;
  } catch (error) {
    return [];
  }
}

// Function to sort products by date
export const SortProductsByDate = async (order) => {
  try {
    const resp = await axios.get(`${apiBase}/products/date?order=${order}`);
    return resp.data;
  } catch (error) {
    return [];
  }
}

// Function to sort products by price
export const SortProductsByPrice = async (order) => {
  try {
    const resp = await axios.get(`${apiBase}/products/price?order=${order}`);
    return resp.data;
  } catch (error) {
    return [];
  }
}

// Function to rate a product
export const RateProduct = async (id, body) => {
  const reqBody = {
    rating: body
  };
  try {
    const resp = await axios.put(`${apiBase}/products/rating/${id}`, reqBody, {
      headers: customHeader
    });
    if (resp.status === 200) {
      return true;
    } else {
      return null;
    }
  } catch (error) {
    console.log(error);
    return null;
  }
}

// Function to get product data by ID
export const GetProductData = async (id) => {
  try {
    const resp = await axios.get(`${apiBase}/products/${id}`);
    if (resp.status === 200) {
      return resp.data;
    } else {
      return null;
    }
  } catch (error) {
    return null;
  }
}
