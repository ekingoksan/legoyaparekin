import { configureStore } from "@reduxjs/toolkit";
import slider_api from "./slider/slider-api";


export const store = configureStore({
  reducer: {
    [slider_api.reducerPath]: slider_api.reducer,

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
       
    }).concat([
        slider_api.middleware,
    ]),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;