import axios from "axios";
import { apiBase } from "./data";

// Function to sign in the user with the provided credentials
export const SingIn = async (body) => {
  // Initialize variables to determine the user type (admin or regular user)
  const type = {
    admin: false,
    user: false,
  };

  try {
    const resp = await axios.post(apiBase + '/auth/login', body);

    if (resp.status === 200) {
      // Save user data in local storage
      localStorage.setItem('user', JSON.stringify(resp.data));

      if (resp.data.isAdmin) {
        type.admin = true; // Set admin to true if the user is an admin
      } else {
        type.user = true; // Set user to true if the user is not an admin
      }
      return type;
    } else {
      return false; // Return false in case of an unsuccessful login
    }
  } catch (error) {
    return false; // Return false in case of an error
  }
}

// Function to sign up a new user with the provided user information
export const SingUp = async (body) => {
  try {
    const resp = await axios.post(apiBase + '/auth/register', body);

    if (resp.status === 200) {
      return true; // Return true if the registration is successful
    } else {
      return false; // Return false in case of an unsuccessful registration
    }
  } catch (error) {
    return false; // Return false in case of an error
  }
}

// Function to sign out the user by clearing local storage
export const SignOut = async () => {
  localStorage.clear(); // Clear user data from local storage upon sign out
}
