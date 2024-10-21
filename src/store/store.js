import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const saveStateToLocalStorage = (state) => {
    try {
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
            const serializedState = JSON.stringify(state);
            localStorage.setItem('reduxUserState', serializedState);
        }
    } catch (e) {
        console.warn("Could not save state", e);
    }
};
const loadStateFromLocalStorage = () => {
    try {
        if (typeof window !== "undefined" && typeof localStorage !== "undefined") {
            const serializedState = localStorage.getItem('reduxUserState');
            if (serializedState === null) return undefined;
            return JSON.parse(serializedState);
        }
        return undefined;
    } catch (e) {
        console.warn("Could not load state", e);
        return undefined;
    }
};
const localStorageStore = loadStateFromLocalStorage();

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState: localStorageStore,
});

store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
});

export default store;
