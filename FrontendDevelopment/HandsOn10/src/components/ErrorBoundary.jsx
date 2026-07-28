import React, { Component } from 'react';

// ==========================================================================
// TASK 3 - Step 150: Global Error Boundary component wrapping the app
// ==========================================================================
class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  // Update state to show the fallback UI
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  // Log the error to console (Step 150)
  componentDidCatch(error, errorInfo) {
    console.error('[Global Error Boundary Caught Error]:', error, errorInfo);
  }

  // Action to reset boundary state
  handleReset = () => {
    this.setState({ hasError: false, error: null });
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      // Fallback UI (Step 150)
      return (
        <div style={{
          padding: '50px 20px',
          textAlign: 'center',
          fontFamily: 'Arial, sans-serif',
          background: '#f8d7da',
          color: '#721c24',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <div style={{
            background: 'white',
            padding: '40px',
            borderRadius: '10px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            maxWidth: '600px',
            width: '100%'
          }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#721c24' }}>
              ⚠️ Critical Application Error
            </h1>
            
            <p style={{ fontSize: '1.1rem', marginBottom: '25px', color: '#555' }}>
              An unexpected error occurred in the Student Portal layout engine.
            </p>
            
            <div style={{
              background: '#f8f9fa',
              padding: '15px',
              borderRadius: '5px',
              textAlign: 'left',
              fontFamily: 'monospace',
              fontSize: '0.9rem',
              color: '#333',
              overflowX: 'auto',
              marginBottom: '30px',
              borderLeft: '4px solid #dc3545'
            }}>
              {this.state.error && this.state.error.toString()}
            </div>
            
            <button 
              onClick={this.handleReset}
              style={{
                padding: '12px 25px',
                background: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '5px',
                fontWeight: 'bold',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'background 0.2s'
              }}
            >
              Reload & Go Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
