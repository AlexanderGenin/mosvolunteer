import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { mockEvents } from "../../../data/data";
import { EventsFilters, TEvent } from "../../../types/types";
import { client } from "../../api/client";
import { RootState } from "../../store/store";

type EventsState = {
  status: "error" | "success" | "idle" | "pending";
  error: string | null;
  events: TEvent[];
};

const initialState: EventsState = {
  events: [],
  status: "idle",
  error: null,
};

export const fetchEvents = createAsyncThunk<TEvent[], EventsFilters>(
  "events/fetchEvents",
  async (filters) => {
    // const q = new URLSearchParams(filters).toString();
    //   const response = await client.get('/fakeApi/events')
    const response = await Promise.resolve({ data: mockEvents });
    return response.data;
  }
);

export const addNewEvent = createAsyncThunk<TEvent, EventsState>(
  "events/addNewEvent",
  async (initialEvent) => {
    const response = await client.post("/fakeApi/events", initialEvent);
    return response.data;
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
