import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IStudent, IStudentState } from "../interfaces/student";
import { studentService } from "../../services/student.service";

//initial state
const initialState: IStudentState = {
  data: [],
  loading: false,
  error: null,
};

//Async thunk: Register new student
export const registerStudent = createAsyncThunk(
  "students/registerStudent",
  async (studentData: IStudent, { rejectWithValue, getState }) => {
    const state = getState() as { student: IStudentState };
    const existingStudent = state.student.data.find(
      (student) => student.emailAddress === studentData.emailAddress
    );
    if (existingStudent) {
      return rejectWithValue("Email already exists");
    }
    try {
      const response = await studentService.registerStudent(studentData);
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        error?.response?.data?.message ??
        error?.message ??
        "Student registration failed";
      return rejectWithValue(message);
    }
  }
);

const studentSlice = createSlice({
  name: "student",
  initialState,
  reducers: {
    resetStudentState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerStudent.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(registerStudent.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      if (action.payload) {
        state.data = [...state.data, action.payload as IStudent];
      }
    });
    builder.addCase(registerStudent.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetStudentState } = studentSlice.actions;
export default studentSlice.reducer;
