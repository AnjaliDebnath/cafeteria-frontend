import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/AuthSlice";
import cartReducer from "./slices/CartSlice";


export default configureStore({
    reducer:{
        auth:authReducer,
        cart:cartReducer

    },
});