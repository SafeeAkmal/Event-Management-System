import { createSlice } from '@reduxjs/toolkit';

const loadRegistrations = () => {
  try {
    const saved = localStorage.getItem('userRegistrations');
    return saved ? JSON.parse(saved) : {};
  } catch {
    return {};
  }
};

const registrationSlice = createSlice({
  name: 'registrations',
  initialState: {
    // Structure: { [userEmail]: [ eventObject1, eventObject2 ] }
    byUser: loadRegistrations(),
  },
  reducers: {
    registerForEvent: (state, action) => {
      const { userEmail, event } = action.payload;
      if (!state.byUser[userEmail]) {
        state.byUser[userEmail] = [];
      }
      
      const exists = state.byUser[userEmail].some((item) => item.id === event.id);
      if (!exists) {
        state.byUser[userEmail].push({
          ...event,
          registeredAt: new Date().toISOString(),
        });
        localStorage.setItem('userRegistrations', JSON.stringify(state.byUser));
      }
    },
    cancelRegistration: (state, action) => {
      const { userEmail, eventId } = action.payload;
      if (state.byUser[userEmail]) {
        state.byUser[userEmail] = state.byUser[userEmail].filter(
          (event) => event.id !== eventId
        );
        localStorage.setItem('userRegistrations', JSON.stringify(state.byUser));
      }
    },
  },
});

export const { registerForEvent, cancelRegistration } = registrationSlice.actions;
export default registrationSlice.reducer;