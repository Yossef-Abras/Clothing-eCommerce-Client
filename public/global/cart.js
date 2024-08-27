import axios from "axios";
export const getCart = async () => {
    let token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.get(`${process.env.BASE_API_URL}/cart`, {
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
export const addToCart = async (productId) => {
    let token = localStorage.getItem("token");
    if (token) {
        try {
            const response = await axios.post(`${process.env.BASE_API_URL}/cart`, { productId },
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
export const deletProductFromCart = async (productId) => {
    let token = localStorage.getItem("token");
    if (token) {
        try {
            await axios.delete(`${process.env.BASE_API_URL}/cart/${productId}`, {
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

