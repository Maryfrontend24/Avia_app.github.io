import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../slices/filtersSlice.js';
import ticketsReducer from '../slices/ticketsSlice.js';

export const store = configureStore({
  reducer: {
    tickets: ticketsReducer,
    filters: filtersReducer,
  },
});
