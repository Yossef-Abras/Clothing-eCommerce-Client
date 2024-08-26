// axios.js
import axios from "axios";

export const isLogin = async () => {
  const token = localStorage.getItem("token");
  if (!token) return false;
  try {
    const res = await axios.get(`${process.env.BASE_API_URL}/auth/checkLogin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("user", JSON.stringify(res.data.user));
    return true;
  } catch (err) {
    throw err.response?.data;
  }
};

export const login = async (email, password) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_API_URL}/auth/login`,
      {
        email,
        password,
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status == 401)
      return { error: true, msg: error.response.data.message };
    throw error.response.data;
  }
};

export const signup = async (name, email, password, passwordConfirm) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_API_URL}/auth/signup`,
      {
        name,
        email,
        password,
        passwordConfirm,
      }
    );
    localStorage.setItem("user", JSON.stringify(response.data.user));
    localStorage.setItem("token", response.data.token);
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status == 400)
      return { error: true, msg: error.response.data.errors[0]["msg"] };
    throw error.response.data;
  }
};

// export const verifyEmail = async (email, code) => {
//     try {
//         const response = await axios.post(`${API_BASE_URL}/verify-email`, {
//             email,
//             code,
//         });
//         return {
//             data: response.data,
//         };
//     } catch (error) {
//         throw error.response.data;
//     }
// };
