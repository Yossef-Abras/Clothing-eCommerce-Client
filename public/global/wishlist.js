import axios from "axios";
import { getToken } from "./helper";

export const getWishlist = async () => {
  let token = getToken();
  if (token) {
    try {
      const response = await axios.get(`${process.env.BASE_API_URL}/wishlist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data.data;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    throw new Error("You're not logged in!!");
  }
};
export const addToWishlist = async (productId) => {
  let token = getToken();
  if (token) {
    try {
      const response = await axios.post(
        `${process.env.BASE_API_URL}/wishlist`,
        { productId },
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
export const deleteFromWishlist = async (productId) => {
  let token = getToken();
  if (token) {
    try {
      await axios.delete(`${process.env.BASE_API_URL}/wishlist/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return true;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    throw new Error("You're not logged in!!");
  }
};
