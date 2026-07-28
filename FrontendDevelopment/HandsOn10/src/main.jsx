import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store'
import { EnrollmentProvider } from './context/EnrollmentContext'
import ErrorBoundary from './components/ErrorBoundary'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* TASK 3 - Step 88: Wrap the app in Redux Provider */}
    <Provider store={store}>
      {/* TASK 2 - Step 82: Wrap the app in EnrollmentProvider (Context API) */}
      <EnrollmentProvider>
        {/* TASK 1 - Step 76: Wrap your <App /> in <BrowserRouter> */}
        <BrowserRouter>
          {/* TASK 3 - Step 150: Global Error Boundary wrap */}
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </EnrollmentProvider>
    </Provider>
  </StrictMode>,
)
