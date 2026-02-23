import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
        // Future RTK Query API slices go here:
        // [productApi.reducerPath]: productApi.reducer,
        // [orderApi.reducerPath]: orderApi.reducer,
    },
    // Future: add RTK Query middleware here
    // middleware: (getDefaultMiddleware) =>
    //     getDefaultMiddleware().concat(productApi.middleware, orderApi.middleware),
});

export default store;
