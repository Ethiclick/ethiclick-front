/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-param-reassign */
/* eslint-disable import/no-extraneous-dependencies */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { configureStore, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { PayloadAction, ThunkAction, Action } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export interface CounterState {
  value: number;
  status: 'idle' | 'loading' | 'failed';
}

const initialState: CounterState = {
  value: 0,
  status: 'idle',
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    increment: (state: CounterState) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // Use the PayloadAction type to declare the contents of `action.payload`
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
  },
});

export const { increment, decrement, incrementByAmount } = counterSlice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectCount = (state: RootState) => state.counter.value;

export default counterSlice.reducer;

export const store = configureStore({
  reducer: {
    counter: counterSlice.reducer,
  },
});
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

// interface UserState {
//   guest: boolean;
//   logged: boolean;
//   admin: boolean;
//   user: object;
// }
// const userInitialState: UserState = {
//   guest: true,
//   logged: false,
//   admin: false,
//   user: {},
// };

// export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;

// const userSlice = createSlice({
//   name: 'user',
//   userInitialState,
//   reducers: {
//     setGuest(state) {
//       state.guest = true;
//       state.logged = false;
//       state.admin = false;
//     },
//     setLogged(state) {
//       state.logged = true;
//       state.guest = false;
//       state.admin = false;
//     },
//     setAdmin(state) {
//       state.guest = true;
//       state.logged = false;
//       state.admin = false;
//     },
//     setUser(state, action: PayloadAction<object>) {
//       // eslint-disable-next-line no-param-reassign
//       state.user = action.payload;
//     },
//     logout(state) {
//       state.guest = true;
//       state.logged = false;
//       state.admin = false;
//       state.user = {};
//       //   router.push('/login');
//     },
//   },
// });

// export const store = configureStore({
//   reducer: userSlice.reducer,
// });
