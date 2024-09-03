export const getToken = () => {
    return localStorage.getItem("token");
};

export const setToken = (token) => {
    localStorage.setItem("token", token);
};

export const removeToken = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
};

export const handle401Error = (error) => {
    if (error.response && error.response.status === 401) {
        removeToken();
    }
    throw error;
};
