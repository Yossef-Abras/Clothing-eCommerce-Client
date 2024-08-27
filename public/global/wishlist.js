import axios from "axios";
export const getWishlist = async () => {
    let token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.get(`${process.env.BASE_API_URL}/wishlist`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data.data
        } catch (error) {
            throw error.response.data;
        }
    }

};
export const createWislist = async (productId) => {
    let token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.post(`${process.env.BASE_API_URL}/wishlist`, { productId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
            return response.data
        } catch (error) {
            throw error.response.data;
        }
    }
};
export const deletProductFromWishlist = async (productId) => {
    let token = localStorage.getItem("token");
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
    }

};

