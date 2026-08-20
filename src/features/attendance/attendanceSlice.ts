import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export type AttendanceRecord = {
  id: string;
  employeeId: string;
  date: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "Present" | "Absent" | "Leave";
  hoursWorked: number | null;
  notes?: string;
  employee?: {
    id: string;
    name: string;
    email: string;
  };
};

export type AttendanceSummary = {
  total: number;
  present: number;
  absent: number;
  avgHours: number;
};

type AttendanceState = {
  records: AttendanceRecord[];
  summary: AttendanceSummary;
  loading: boolean;
  error: string | null;
  success: boolean;
};

const initialState: AttendanceState = {
  records: [],
  summary: {
    total: 0,
    present: 0,
    absent: 0,
    avgHours: 0,
  },
  loading: false,
  error: null,
  success: false,
};

// Async thunk for fetching attendance records
export const fetchAttendance = createAsyncThunk(
  "attendance/fetchAttendance",
  async (
    params: { date?: string; search?: string; status?: string; token: string },
    { rejectWithValue }
  ) => {
    try {
      const queryParams = new URLSearchParams();
      if (params.date) queryParams.append("date", params.date);
      if (params.search) queryParams.append("search", params.search);
      if (params.status) queryParams.append("status", params.status);

      const res = await fetch(`/api/attendance?${queryParams.toString()}`, {
        headers: {
          Authorization: `Bearer ${params.token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch attendance records");
      }

      return res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for creating attendance
export const createAttendance = createAsyncThunk(
  "attendance/createAttendance",
  async (
    data: {
      employee_id: string;
      date: string;
      check_in?: string;
      check_out?: string;
      status: string;
      notes?: string;
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { token, ...payload } = data;
      const res = await fetch("/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create attendance");
      }

      return res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating attendance
export const updateAttendance = createAsyncThunk(
  "attendance/updateAttendance",
  async (
    data: {
      id: string;
      employee_id?: string;
      date?: string;
      check_in?: string;
      check_out?: string;
      status?: string;
      notes?: string;
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { token, id, ...payload } = data;
      const res = await fetch(`/api/attendance/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to update attendance");
      }

      return res.json();
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting attendance
export const deleteAttendance = createAsyncThunk(
  "attendance/deleteAttendance",
  async (
    data: {
      id: string;
      token: string;
    },
    { rejectWithValue }
  ) => {
    try {
      const { token, id } = data;
      const res = await fetch(`/api/attendance/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to delete attendance");
      }

      return { id };
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);

const attendanceSlice = createSlice({
  name: "attendance",
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearSuccess: (state) => {
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    // Fetch Attendance
    builder
      .addCase(fetchAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.records = action.payload.data || [];
        state.summary = action.payload.summary || {
          total: 0,
          present: 0,
          absent: 0,
          avgHours: 0,
        };
        state.success = true;
      })
      .addCase(fetchAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Create Attendance
    builder
      .addCase(createAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.records.unshift(action.payload.data);
        state.success = true;
      })
      .addCase(createAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Update Attendance
    builder
      .addCase(updateAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAttendance.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.records.findIndex(
          (r) => r.id === action.payload.data.id
        );
        if (index !== -1) {
          state.records[index] = action.payload.data;
        }
        state.success = true;
      })
      .addCase(updateAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });

    // Delete Attendance
    builder
      .addCase(deleteAttendance.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAttendance.fulfilled, (state, action) => {
        state.loading = false;
        state.records = state.records.filter(
          (r) => r.id !== action.payload.id
        );
        state.success = true;
      })
      .addCase(deleteAttendance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearError, clearSuccess } = attendanceSlice.actions;
export default attendanceSlice.reducer;
