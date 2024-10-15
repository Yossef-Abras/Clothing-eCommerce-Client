import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

const saveStateToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('reduxState', serializedState);
    } catch (e) {
        console.warn("Could not save state", e);
    }
};
const loadStateFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('reduxState');
        if (serializedState === null) return undefined; // إذا لم توجد حالة مخزنة
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn("Could not load state", e);
        return undefined;
    }
};

const preloadedState = loadStateFromLocalStorage();

const store = configureStore({
    reducer: {
        user: userReducer,
    },
    preloadedState,
});

store.subscribe(() => {
    saveStateToLocalStorage(store.getState());
});

export default store;
