// src/app/store.js

import { configureStore } from '@reduxjs/toolkit';
import groupReducer from '../features/groups/groupSlice';

export const store = configureStore({
  reducer: {
    groups: groupReducer,
    // Add more reducers here as needed
  },
});

export default store;
