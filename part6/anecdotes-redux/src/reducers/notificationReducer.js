import { createSlice } from "@reduxjs/toolkit";

const initialState = "";

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    createNotification(state, action){
      return action.payload
    },
    removeNotification(state, action){
      return initialState
    }
    // You can add any additional reducers here if needed in the future
  },
});

export const { createNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer;
