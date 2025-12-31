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
      console.log("Payload in setWeatherData:", action.payload);
      console.log("Current state before setting data:", state);
      state.weatherData = action.payload;
    },
    setWeatherError: (state, action) => {
      state.weatherData = null;
    },
    setWeatherLocation: (state, action) => {
      console.log("Payload in setWeatherLocation:", action.payload);
      console.log("Current state before setting location:", state);
      state.weatherLocation = action.payload;
    },
    setLocationError: (state, action) => {
      state.weatherLocation = null;
    }
  },
});

export const { setWeatherData,setWeatherError, setWeatherLocation,setLocationError } = weatherSlice.actions;
export default weatherSlice.reducer;