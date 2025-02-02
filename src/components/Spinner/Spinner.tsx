import React from 'react';
import './spinner.css';

class Spinner extends React.Component {
  // Tailwind classes for different sizes
  sizes = {
    sm: 'w-4 h-4',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  // Tailwind classes for different colors
  colors = {
    primary: 'border-blue-500',
    secondary: 'border-gray-500',
    success: 'border-green-500',
    danger: 'border-red-500',
    warning: 'border-yellow-500',
  };

  render() {
    return (
      <>
        <div
          className="spinner"
          style={{
            width: '32px',
            height: '32px',
            borderColor: '#0066cc',
            borderTopColor: 'transparent',
          }}
          role="status"
          aria-label="loading"
        ></div>
        <span className="spinner-text">Loading...</span>
      </>
    );
  }
}

export default Spinner;
