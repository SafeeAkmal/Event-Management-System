import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const API_KEY = import.meta.env.VITE_TICKETMASTER_API_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2';

export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async ({ keyword = '', category = '', page = 0 }, { rejectWithValue }) => {
    try {
      let url = `${BASE_URL}/events.json?apikey=${API_KEY}&size=12&page=${page}&sort=date,asc`;
      if (keyword) url += `&keyword=${encodeURIComponent(keyword)}`;
      if (category) url += `&classificationName=${encodeURIComponent(category)}`;

      const response = await fetch(url);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch events from Ticketmaster.');
      }

      return {
        events: data._embedded?.events || [],
        pageInfo: data.page || {},
      };
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

export const fetchEventDetails = createAsyncThunk(
  'events/fetchEventDetails',
  async (eventId, { rejectWithValue }) => {
    try {
      const response = await fetch(`${BASE_URL}/events/${eventId}.json?apikey=${API_KEY}`);
      const data = await response.json();
      if (!response.ok) throw new Error('Event details not found.');
      return data;
    } catch (err) {
      return rejectWithValue(err.message);
    }
  }
);

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    list: [],
    selectedEvent: null,
    loading: false,
    error: null,
    pagination: { currentPage: 0, totalPages: 0 },
    filters: { keyword: '', category: '' },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearSelectedEvent: (state) => {
      state.selectedEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Event List
      .addCase(fetchEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.loading = false;
        state.list = action.payload.events;
        state.pagination.currentPage = action.payload.pageInfo.number || 0;
        state.pagination.totalPages = action.payload.pageInfo.totalPages || 0;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Failed to fetch events';
      })
      // Fetch Event Details
      .addCase(fetchEventDetails.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEventDetails.fulfilled, (state, action) => {
        state.loading = false;
        state.selectedEvent = action.payload;
      })
      .addCase(fetchEventDetails.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setFilters, clearSelectedEvent } = eventsSlice.actions;
export default eventsSlice.reducer;