// components/LoadingDots.js
import React from 'react';

const LoadingDots = () => {
  return (
    <div className="flex items-center space-x-1">
      <span className="text-lg">Processing</span>
      <span className="animate-bounce">.</span>
      <span className="animate-bounce delay-100">.</span>
      <span className="animate-bounce delay-200">.</span>
    </div>
  );
};

export default LoadingDots;