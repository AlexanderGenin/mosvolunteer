import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";

import eventsReducer from "../features/eventsSlice";
import tagsReducer from "../features/tagsSlice";

const store = configureStore({
  reducer: {
    events: eventsReducer,
    tags: tagsReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
