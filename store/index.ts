/* eslint-disable no-param-reassign */
import { configureStore, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export interface UserState {
  logged: boolean;
  user: object;
  status: 'user' | 'admin' | 'pro';
}

const initialState: UserState = {
  logged: false,
  user: {},
  status: 'user',
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    login: (state: UserState) => {
      state.logged = true;
    },
    logout: (state) => {
      state.logged = false;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    setUser: (state, action: PayloadAction<object>) => {
      state.user = action.payload;
    },
  },
});

export const { login, logout, setUser } = userSlice.actions;
export const isLogged = (state: RootState) => state.user.logged === true;
export const getUser = (state: RootState) => state.user.user;

export default userSlice.reducer;

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
