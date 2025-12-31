import { configureStore } from "@reduxjs/toolkit";
import weatherReducer from "./reducer/weatherSlice";

export const store = configureStore({
    reducer: {  weather: weatherReducer },
});
