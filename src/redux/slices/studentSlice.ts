import { createAsyncThunk, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IStudent, IStudentLogin, IStudentLoginResponse, IStudentState } from "../interfaces/student";
import { studentService } from "../../services/student.service";
import { STUDENT_TOKEN_KEY, STUDENT_DATA_KEY } from "../../services/api-request";

const initialState: IStudentState = {
  data: [],
  loading: false,
  error: null,
  authToken: null,
  currentStudent: null,
};

export const loginStudent = createAsyncThunk(
  "students/loginStudent",
  async (loginData: IStudentLogin, { rejectWithValue }) => {
    try {
      const response = await studentService.loginStudent(loginData);
      return response.data as IStudentLoginResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Login failed. Please check your credentials.";
      return rejectWithValue(message);
    }
  }
);

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
      const message = error?.response?.data?.message ?? error?.message ?? "Student registration failed";
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
    logoutStudent: (state) => {
      state.authToken = null;
      state.currentStudent = null;
      localStorage.removeItem(STUDENT_TOKEN_KEY);
      localStorage.removeItem(STUDENT_DATA_KEY);
      sessionStorage.removeItem(STUDENT_TOKEN_KEY);
      sessionStorage.removeItem(STUDENT_DATA_KEY);
    },
    initializeStudentAuth: (state) => {
      const token = localStorage.getItem(STUDENT_TOKEN_KEY) || sessionStorage.getItem(STUDENT_TOKEN_KEY);
      const studentData = localStorage.getItem(STUDENT_DATA_KEY) || sessionStorage.getItem(STUDENT_DATA_KEY);
      if (token && studentData) {
        state.authToken = token;
        state.currentStudent = JSON.parse(studentData);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStudent.fulfilled, (state, action: PayloadAction<IStudentLoginResponse>) => {
        state.loading = false;
        state.error = null;
        state.authToken = action.payload.token;
        state.currentStudent = action.payload.student;
      })
      .addCase(loginStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.authToken = null;
        state.currentStudent = null;
      })
      .addCase(registerStudent.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerStudent.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        if (action.payload) {
          state.data = [...state.data, action.payload as IStudent];
        }
      })
      .addCase(registerStudent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetStudentState, logoutStudent, initializeStudentAuth } = studentSlice.actions;
export default studentSlice.reducer;