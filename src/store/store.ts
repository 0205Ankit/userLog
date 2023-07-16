import { configureStore, createSlice } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userApi } from "./apiSlice";

export const toastSliceInitialState = {
  showToast: false,
  title: "",
  info: "info",
  type: "",
  toastId:""
};

const toastSlice = createSlice({
  name: "toast",
  initialState: toastSliceInitialState,
  reducers: {
    showToast(state,action) {
      // state.showToast = action.payload;
          state.showToast = true;
          state.title = action.payload.title;
          state.info = action.payload.info;
          state.toastId = action.payload.toastId;

    },
    hideToast(state) {
      state.showToast=false
    }
  },
});

const store = configureStore({
  reducer: {
    toast: toastSlice.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(userApi.middleware),
});

setupListeners(store.dispatch);

export const toastSliceActions = toastSlice.actions;

export type RootState = ReturnType<typeof store.getState>

export default store;
