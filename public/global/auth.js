// axios.js
import axios from "axios";
import {
  getToken,
  setToken,
  handle401Error,
} from "./helper";

export const isLogin = async () => {
  const token = getToken();
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
    handle401Error(err);
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
    setToken(response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status === 401)
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
    setToken(response.data.token);
    localStorage.setItem("user", JSON.stringify(response.data.user));
    return { error: false, data: response.data };
  } catch (error) {
    if (error.response.status === 400)
      return { error: true, msg: error.response.data.errors[0]["msg"] };
    throw error.response.data;
  }
};

export const verifyEmail = async (email, code) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_API_URL}/auth/verifyEmail`,
      {
        email,
        code,
      }
    );
    return {
      ...response.data,
    };
  } catch (error) {
    handle401Error(error);
  }
};

export const resendVerificationCode = async (email) => {
  try {
    const response = await axios.post(
      `${process.env.BASE_API_URL}/auth/resendVerificationCode`,
      {
        email,
      }
    );
    return {
      ...response.data,
    };
  } catch (error) {
    handle401Error(error);
  }
};

export const forgetPassword = async (email) => {
  try {
    const res = await axios.post(
      `${process.env.BASE_API_URL}/auth/forgotPassword`,
      { email }
    );
    return { error: false, data: res.data };
  } catch (err) {
    handle401Error(err);
  }
};

export const verifyPassResetCode = async (resetCode) => {
  try {
    const res = await axios.post(
      `${process.env.BASE_API_URL}/auth/verifyPassResetCode`,
      { resetCode }
    );
    return { error: false, data: res.data };
  } catch (err) {
    handle401Error(err);
  }
};

export const resetPassword = async (email, newPassword) => {
  try {
    const res = await axios.put(
      `${process.env.BASE_API_URL}/auth/resetPassword`,
      { email, newPassword }
    );
    return { error: false, data: res.data };
  } catch (err) {
    handle401Error(err);
  }
};
