import { createSlice } from "@reduxjs/toolkit";

// Get initial state of employee from local storage. Empty if does not exist
const initialState = {
  employees:
    typeof window !== "undefined" && localStorage.getItem("employees")
      ? JSON.parse(localStorage.getItem("employees"))
      : [],
};

// Create a Redux slice for employee management
const employeeSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    // Action to add a new employee
    addEmployee: (state, action) => {
      state.employees.push({ ...action.payload, id: Date.now() });
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },

    // Action to edit an existing employee
    editEmployee: (state, action) => {
      const { id, updatedEmployee } = action.payload;
      state.employees = state.employees.map((employee) =>
        employee.id === id ? { ...updatedEmployee, id } : employee
      );

      // Update localStorage with the new state
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },

    // Action to delete an employee
    deleteEmployee: (state, action) => {
      state.employees = state.employees.filter(
        (employee) => employee.id !== action.payload
      );
      localStorage.setItem("employees", JSON.stringify(state.employees));
    },
  },
});

export const { addEmployee, editEmployee, deleteEmployee } =
  employeeSlice.actions;
export default employeeSlice.reducer;
