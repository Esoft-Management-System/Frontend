import { configureStore } from "@reduxjs/toolkit";
import studentReducer from "./slices/studentSlice";
import staffReducer from "./slices/staffSlice";


export const store = configureStore({
  reducer: {
    student: studentReducer,
    staff: staffReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: true,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch  = typeof store.dispatch;