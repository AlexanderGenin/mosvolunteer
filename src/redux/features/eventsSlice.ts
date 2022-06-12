import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { EventData, EventsFilters, TEvent } from "../../types/types";
import { client } from "../api/client";
import { RootState } from "../store/store";
import { prepareSearchParams } from "../../utils/utils";

type EventsState = {
  status: "error" | "success" | "idle" | "pending";
  error: string | null;
  events: TEvent[];
};

type EventState = {
  status: "error" | "success" | "idle" | "pending";
  error: string | null;
  event: TEvent;
};

const initialState: EventsState = {
  events: [],
  status: "idle",
  error: null,
};

export const fetchEvents = createAsyncThunk<TEvent[], EventsFilters>(
  "events/fetchEvents",
  async (filters, thunkAPI) => {
    try {
      const q = prepareSearchParams(filters);
      const response = await client.get(`events?${q}`);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
);

export const addNewEvent = createAsyncThunk<TEvent, EventData>(
  "events/addNewEvent",
  async (newEvent) => {
    try {
      const response = await client.post("events", newEvent);
      return response.data;
    } catch (e) {
      console.error(e);
    }
  }
);

const eventsSlice = createSlice({
  name: "events",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchEvents.pending, (state, action) => {
        state.status = "pending";
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = "success";
        state.events = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = "error";
        state.error = action.error.message ?? null;
      });
  },
});

// export const { eventAdded, eventUpdated, reactionAdded } = eventsSlice.actions;

export default eventsSlice.reducer;

export const selectAllEvents = (state: RootState) => state.events.events;

export const selectEventById = (state: RootState, eventId: number) =>
  state.events.events.find((event) => event.id === eventId);
