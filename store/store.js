import { configureStore } from "@reduxjs/toolkit";
import employeeReducer from "./employeeSlice";

// Configure the Redux store with the employee slice
export const store = configureStore({
  reducer: {
    employees: employeeReducer,
  },
});
