import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Define an initial state for the groups
const initialState = {
  groups: [],
  loading: false,
  error: null,
};

// Create an async thunk for fetching groups
export const fetchGroups = createAsyncThunk('groups/fetch', async () => {
  const response = await axios.get(`${process.env.REACT_APP_API_URL}/groups`);
  console.log("Fetched Groups:", response.data); // Log fetched data
  return response.data; // Return the fetched groups
});

// Create an async thunk for adding a new group
export const addGroup = createAsyncThunk('groups/add', async (newGroup) => {
  const response = await axios.post(`${process.env.REACT_APP_API_URL}/groups`, newGroup);
  console.log("Added Group:", response.data.group); // Log the added group
  return response.data.group; // Return the added group
});

// Create a slice for groups
const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    // You can define any additional synchronous actions here if needed
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchGroups.pending, (state) => {
        state.loading = true; // Set loading to true when fetching
        state.error = null; // Reset error state
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.loading = false; // Set loading to false when fetching is complete
        state.groups = action.payload; // Set groups to the fetched data
      })
      .addCase(fetchGroups.rejected, (state, action) => {
        state.loading = false; // Set loading to false on error
        state.error = action.error.message; // Capture the error message
      })
      .addCase(addGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload); // Add the new group to the list
      })
      .addCase(addGroup.rejected, (state, action) => {
        state.error = action.error.message; // Handle any errors from adding a group
      });
  },
});

// Export the actions if needed in your components
export const {} = groupSlice.actions;

// Export the reducer to be included in the store
export default groupSlice.reducer;
