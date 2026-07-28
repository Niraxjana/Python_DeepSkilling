import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getAllCourses } from '../api/courseApi';

// ==========================================================================
// TASK 2 - Step 143: Add async thunk using createAsyncThunk
// ==========================================================================
export const fetchAllCourses = createAsyncThunk(
  'courses/fetchAll',
  async (_, { rejectWithValue }) => {
    try {
      return await getAllCourses();
    } catch (err) {
      // Catch error and pass standard message to rejected state (Step 140/147)
      return rejectWithValue(err.message || 'Failed to load courses from API.');
    }
  }
);

// ==========================================================================
// TASK 3 - Step 87 (Refactored to include loading, error, and courses state)
// ==========================================================================
const enrollmentSlice = createSlice({
  name: 'enrollment',
  initialState: {
    enrolledCourses: [], // IDs of enrolled courses
    courses: [],         // Fetched courses list
    loading: false,      // Loading state tracker
    error: null          // Error state tracker
  },
  reducers: {
    // Reducer to enroll in a course (Redux Toolkit uses Immer to safely mutate)
    enroll: (state, action) => {
      const courseId = action.payload;
      if (!state.enrolledCourses.includes(courseId)) {
        state.enrolledCourses.push(courseId);
      }
    },
    // Reducer to un-enroll / remove a course
    unenroll: (state, action) => {
      const courseId = action.payload;
      state.enrolledCourses = state.enrolledCourses.filter(id => id !== courseId);
    }
  },
  // ==========================================================================
  // TASK 2 - Step 144: Handle the three thunk lifecycle actions
  // ==========================================================================
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCourses.fulfilled, (state, action) => {
        state.courses = action.payload;
        state.loading = false;
      })
      .addCase(fetchAllCourses.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

// Export reducers
export const { enroll, unenroll } = enrollmentSlice.actions;

// ==========================================================================
// TASK 2 - Step 146: Add selectors for components to avoid direct state access
// ==========================================================================
export const selectCourses = (state) => state.enrollment.courses;
export const selectCoursesLoading = (state) => state.enrollment.loading;
export const selectCoursesError = (state) => state.enrollment.error;
export const selectEnrolledCourses = (state) => state.enrollment.enrolledCourses;

export default enrollmentSlice.reducer;
