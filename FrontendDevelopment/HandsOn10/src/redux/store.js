import { configureStore } from '@reduxjs/toolkit';
import enrollmentReducer from './enrollmentSlice';

// ==========================================================================
// TASK 3 - Step 86: Create store using configureStore from Redux Toolkit
// ==========================================================================
export const store = configureStore({
    reducer: {
        enrollment: enrollmentReducer
    }
});
