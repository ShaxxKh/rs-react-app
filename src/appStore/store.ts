import { configureStore } from '@reduxjs/toolkit';
import { peopleApi } from '../api/users.api';
import peopleReducer from '../features/people/peopleSlice';

export const store = configureStore({
  reducer: {
    [peopleApi.reducerPath]: peopleApi.reducer,
    people: peopleReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(peopleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
