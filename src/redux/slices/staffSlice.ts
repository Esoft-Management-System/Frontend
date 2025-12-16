import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { IStaff, IStaffState } from "../interfaces/staff";
import { staffService } from "../../services/staff.service";

const initialState: IStaffState = {
  data: [],
  loading: false,
  error: null,
};

// Async thunk: Register new staff
export const registerStaff = createAsyncThunk(
  "staff/requestStaff",
  async (staffData: IStaff, { rejectWithValue, getState }) => {
    const state = getState() as { staff: IStaffState };
    const existingStaff = state.staff.data.find(
      (staff) => staff.staffId === staffData.staffId
    );
    if (existingStaff) {
      return rejectWithValue("Staff ID already exists");
    }
    try {
      const response = await staffService.requestsStaff(staffData);
      return response.data;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Staff request failed";
      return rejectWithValue(message);
    }
  }
);

const staffSlice = createSlice({
  name: "staff",
  initialState,

  reducers: {
    resetStaffState: (state) => {
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(registerStaff.pending, (state) => {
      state.loading = true;
      state.error = null;
    });

    builder.addCase(registerStaff.fulfilled, (state, action) => {
      state.loading = false;
      state.error = null;
      if (action.payload) {
        state.data = [...state.data, action.payload as IStaff];
      }
    });
    builder.addCase(registerStaff.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export const { resetStaffState } = staffSlice.actions;
export default staffSlice.reducer;