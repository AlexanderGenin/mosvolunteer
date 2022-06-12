import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import eventsReducer from "../features/events/eventsSlice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
