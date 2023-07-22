import { createSlice } from "@reduxjs/toolkit";

const initialState = "test notification";

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    // You can add any additional reducers here if needed in the future
  },
});

export default notificationSlice.reducer;
