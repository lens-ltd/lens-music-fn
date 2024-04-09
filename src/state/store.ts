import { configureStore } from '@reduxjs/toolkit';
import apiSlice from './apiSlice';
import authSlice from './features/authSlice';
import userSlice from './features/userSlice';
import paginationSlice from './features/paginationSlice';
import artistSlice from './features/artistSlice';
import labelSlice from './features/labelSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    user: userSlice,
    pagination: paginationSlice,
    artist: artistSlice,
    label: labelSlice,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(apiSlice.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
