import { createSlice } from '@reduxjs/toolkit';

const loadUserFromStorage = () => {
  try {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  } catch (error) {
    return null;
  }
};

const loadRegisteredUsersFromStorage = () => {
  try {
    const saved = localStorage.getItem('registeredUsers');
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    return [];
  }
};

const initialState = {
  currentUser: loadUserFromStorage(),
  registeredUsers: loadRegisteredUsersFromStorage(),
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUser: (state, action) => {
      const { name, email, password } = action.payload;
      const userExists = state.registeredUsers.some((u) => u.email === email);

      if (userExists) {
        state.error = 'A user with this email already exists.';
        return;
      }

      const newUser = { name, email, password };
      state.registeredUsers.push(newUser);
      localStorage.setItem('registeredUsers', JSON.stringify(state.registeredUsers));

      // Automatically log in after registration
      state.currentUser = { name, email };
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      state.error = null;
    },
    loginUser: (state, action) => {
      const { email, password } = action.payload;
      const user = state.registeredUsers.find(
        (u) => u.email === email && u.password === password
      );

      if (!user) {
        state.error = 'Invalid email or password.';
        return;
      }

      state.currentUser = { name: user.name, email: user.email };
      localStorage.setItem('currentUser', JSON.stringify(state.currentUser));
      state.error = null;
    },
    logoutUser: (state) => {
      state.currentUser = null;
      localStorage.removeItem('currentUser');
      state.error = null;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
});

export const { registerUser, loginUser, logoutUser, clearAuthError } = authSlice.actions;
export default authSlice.reducer;