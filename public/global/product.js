import axios from "axios";
export const getProducts = async () => {
  try {
    const response = await axios.get(
      `${process.env.BASE_API_URL}/products`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getProduct = async (id) => {
  try {
    const response = await axios.get(
      `${process.env.BASE_API_URL}/products/${id}`
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};

export const getSubCategories = async () => {
  try {
    const response = await axios.get(
      `${process.env.BASE_API_URL}/subcategories`,
      {}
    );
    return response.data;
  } catch (error) {
    throw error.response.data;
  }
};
