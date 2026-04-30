import axios from "axios";
import { BACKEND_URL } from "../config";
import { UserData } from "../types";

export const signin = async (userData: UserData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/user/signin`, userData);
    localStorage.setItem("token", response.data.token);
    return response.data.user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

export const signup = async (userData: UserData) => {
  try {
    await axios.post(`${BACKEND_URL}/user/register`, userData);
    return true;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};
