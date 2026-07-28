import axios from 'axios';

// ==========================================================================
// TASK 1 - Step 138: Configure single Axios instance
// ==========================================================================
const apiClient = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com',
  timeout: 5000,
  headers: {
    'Content-Type': 'application/json'
  }
});

// ==========================================================================
// TASK 1 - Step 141: Request interceptor to attach Authorization header
// ==========================================================================
apiClient.interceptors.request.use((config) => {
  const token = 'Mock-JWT-Token-987654321';
  config.headers.Authorization = `Bearer ${token}`;
  console.log(`[Request Interceptor] API call started: ${config.url}`);
  return config;
}, (error) => {
  return Promise.reject(error);
});

// ==========================================================================
// TASK 1 - Step 140: Response interceptor
// ==========================================================================
apiClient.interceptors.response.use(
  // (a) Returns response.data directly to callers
  (response) => {
    return response.data;
  },
  // (b) Catches errors and throws a standardised Error object with message and statusCode
  (error) => {
    const errorDetails = {
      message: 'Failed to establish connection to the server.',
      statusCode: 500
    };

    if (error.response) {
      // The server responded with a non-2xx status code
      errorDetails.statusCode = error.response.status;
      errorDetails.message = error.response.data?.message || `Server Error (Status: ${error.response.status})`;
    } else if (error.request) {
      // No response was received from the server
      errorDetails.message = 'No response received from the server. Please check your network connection.';
    } else {
      // Error setting up the request
      errorDetails.message = error.message;
    }

    console.error('[Axios Interceptor Caught Error]:', errorDetails);
    
    // Throw standardized error details
    return Promise.reject(errorDetails);
  }
);

export default apiClient;
