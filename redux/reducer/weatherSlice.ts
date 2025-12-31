import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  weatherData: null,
  weatherLocation: null,
};

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setWeatherData: (state, action) => {
      state.weatherData = action.payload;
    },
    setWeatherLocation: (state, action) => {
      state.weatherLocation = action.payload;
    },
  },
});

export const { setWeatherData, setWeatherLocation } = weatherSlice.actions;
export default weatherSlice.reducer;