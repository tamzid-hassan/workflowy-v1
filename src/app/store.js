import { configureStore } from "@reduxjs/toolkit";
import bulletReducer from "../features/bullet/bulletSlice"

export const store = configureStore({
    reducer: bulletReducer
})