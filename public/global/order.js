import axios from "axios";

export const getUserOrders = async () => {
  let token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.get(`${process.env.BASE_API_URL}/orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    throw new Error("No token found. Please log in.");
  }
};

export const getSpecificUserOrders = async (orderId) => {
  let token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.get(
        `${process.env.BASE_API_URL}/orders/${orderId}`,
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
    throw new Error("No token found. Please log in.");
  }
};

export const createCashOrder = async (cartId, shippingAddress) => {
  // shippingAddress: {
  //   details: String,
  //   phone: String,
  //   city: String,
  //   postalCode: String,
  // }
  let token = localStorage.getItem("token");
  if (token) {
    try {
      const response = await axios.post(
        `${process.env.BASE_API_URL}/orders/${cartId}`,
        { shippingAddress },
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
  }
};

export const createCheckoutSession = async (cartId, shippingAddress) => {
  let token = localStorage.getItem("token");

  if (token) {
    try {
      const shippingAddressParams = new URLSearchParams(
        shippingAddress
      ).toString();

      const response = await axios.get(
        `${process.env.BASE_API_URL}/orders/checkout-session/${cartId}?${shippingAddressParams}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response.data.session;
    } catch (error) {
      throw error.response.data;
    }
  } else {
    throw new Error("No token found. Please log in.");
  }
};
