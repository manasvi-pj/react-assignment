import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import toast from 'react-hot-toast';
import { strings } from '../constants/strings';

const defaultUsers = [
  { username: 'admin', password: 'Admin@1234', role: 'admin' },
  { username: 'user', password: 'User@1234', role: 'user' },
];

export const login = createAsyncThunk('auth/login', async (data) => {
  const { username, password, role } = data;

  const user = defaultUsers.find(
    (u) => u.username === username && u.password === password && u.role === role
  );

  if (user) {
    toast.success(strings.loginSuccessToastMsg);
    return {
      user: { username: user.username, role: user.role },
      isAuthenticated: true,
    };
  } else {
    toast.error(strings.userLoginFailed);
    return { user: null, isAuthenticated: false };
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, isAuthenticated: false },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      toast.success(strings.logoutSuccessToastMsg);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.user = action.payload.user;
      state.isAuthenticated = action.payload.isAuthenticated;
    });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
