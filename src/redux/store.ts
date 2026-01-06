import {configureStore} from '@reduxjs/toolkit';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import weatherReducer from './reducer/weatherSlice';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['weather'], // which slices to persist
};

const rootReducer = {
  weather: weatherReducer,
};

// wrap reducers with persistReducer
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer as any, // configureStore will combine this object
);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

// types (if using TS)
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
