import axios from "axios";
import { getToken } from "./helper";

export const getCart = async () => {
  let token = getToken();
  if (token) {
    try {
      const response = await axios.get(`${process.env.BASE_API_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    throw new Error("You're not logged in!!");
  }
};
export const addToCart = async (productId, color, size) => {
  let token = getToken();
  if (token) {
    try {
      const response = await axios.post(
        `${process.env.BASE_API_URL}/cart`,
        { productId, color, size },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    throw new Error("You're not logged in!!");
  }
};

export const updateCartItemQuantity = async (cartItemId, quantity) => {
  let token = getToken();
  if (token) {
    try {
      const response = await axios.put(
        `${process.env.BASE_API_URL}/cart/${cartItemId}`,
        { quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    throw new Error("You're not logged in!!");
  }
};

export const deletProductFromCart = async (cartItemId) => {
  let token = getToken();
  if (token) {
    try {
      const response = await axios.delete(
        `${process.env.BASE_API_URL}/cart/${cartItemId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    throw new Error("You're not logged in!!");
  }
};
