import {
  createAsyncThunk,
  createSlice,
} from "@reduxjs/toolkit";
import type {
  IStaff,
  IStaffLogin,
  IStaffLoginApiResponse,
  IStaffLoginResponse,
  IStaffState,
  IAdminSummaryResponse,
} from "../interfaces/staff";
import { staffService } from "../../services/staff.service";
import { ADMIN_TOKEN_KEY, STAFF_DATA_KEY, STAFF_TOKEN_KEY } from "../../services/api-request";

const STAFF_TEMP_TOKEN_KEY = "staffTemporaryToken";

const initialState: IStaffState = {
  data: [],
  loading: false,
  error: null,
  authToken: null,
  currentStaff: null,
  adminSummary: undefined,
  adminSummaryLoading: false,
  adminSummaryError: null,
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

export const loginStaff = createAsyncThunk(
  "staff/loginStaff",
  async (loginData: IStaffLogin, { rejectWithValue }) => {
    try {
      const response = await staffService.loginStaff(loginData);
      return response.data as IStaffLoginResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Login failed. Please check your credentials.";
      return rejectWithValue(message);
    }
  }
);

export const fetchAdminSummary = createAsyncThunk(
  "staff/fetchAdminSummary",
  async (_, { rejectWithValue }) => {
    try {
      const response = await staffService.getAdminSummary();
      return response.data as IAdminSummaryResponse;
    } catch (error: any) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Failed to load admin summary";
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
    logoutStaff: (state) => {
      state.authToken = null;
      state.currentStaff = null;
      localStorage.removeItem(STAFF_TOKEN_KEY);
      localStorage.removeItem(ADMIN_TOKEN_KEY);
      localStorage.removeItem(STAFF_DATA_KEY);
      sessionStorage.removeItem(STAFF_TOKEN_KEY);
      sessionStorage.removeItem(ADMIN_TOKEN_KEY);
      sessionStorage.removeItem(STAFF_DATA_KEY);
      sessionStorage.removeItem(STAFF_TEMP_TOKEN_KEY);
    },
    initializeStaffAuth: (state) => {
      const token =
        localStorage.getItem(ADMIN_TOKEN_KEY) ||
        sessionStorage.getItem(ADMIN_TOKEN_KEY) ||
        localStorage.getItem(STAFF_TOKEN_KEY) ||
        sessionStorage.getItem(STAFF_TOKEN_KEY);
      const staffData =
        localStorage.getItem(STAFF_DATA_KEY) ||
        sessionStorage.getItem(STAFF_DATA_KEY);
      if (token && staffData) {
        state.authToken = token;
        state.currentStaff = JSON.parse(staffData);
      }
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

    builder
      .addCase(loginStaff.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginStaff.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;

        const payload = action.payload as IStaffLoginApiResponse;

        if ("temporarySessionToken" in payload) {
          state.authToken = null;
          state.currentStaff = payload.staff ?? null;
          sessionStorage.setItem(STAFF_TEMP_TOKEN_KEY, payload.temporarySessionToken);
          if (payload.staff) {
            sessionStorage.setItem(STAFF_DATA_KEY, JSON.stringify(payload.staff));
          }
          return;
        }

        state.authToken = payload.token;
        state.currentStaff = payload.staff;

        const storage = action.meta.arg.rememberMe
          ? localStorage
          : sessionStorage;
        if (payload.tokenType === "adminToken") {
          storage.setItem(ADMIN_TOKEN_KEY, payload.token);
        } else {
          storage.setItem(STAFF_TOKEN_KEY, payload.token);
        }
        storage.setItem(STAFF_DATA_KEY, JSON.stringify(payload.staff));
      })
      .addCase(loginStaff.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
        state.authToken = null;
        state.currentStaff = null;
      });

    builder
      .addCase(fetchAdminSummary.pending, (state) => {
        state.adminSummaryLoading = true;
        state.adminSummaryError = null;
      })
      .addCase(fetchAdminSummary.fulfilled, (state, action) => {
        state.adminSummaryLoading = false;
        state.adminSummary = action.payload as IAdminSummaryResponse;
      })
      .addCase(fetchAdminSummary.rejected, (state, action) => {
        state.adminSummaryLoading = false;
        state.adminSummaryError = action.payload as string;
      });
  },
});

export const { resetStaffState, logoutStaff, initializeStaffAuth } = staffSlice.actions;
export default staffSlice.reducer;
