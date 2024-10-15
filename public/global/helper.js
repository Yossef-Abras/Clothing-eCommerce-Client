import store from "../../src/store/store";
import { logout } from "../../src/store/userSlice";

export const handle401Error = (error) => {
    if (error.response && error.response.status === 401) {
        store.dispatch(logout());
    }
    throw error;
};
