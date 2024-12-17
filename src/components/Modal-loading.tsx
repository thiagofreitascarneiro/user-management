import React from 'react';

interface LoadingWithMessageProps {
  message: string;
}

const LoadingWithMessage: React.FC<LoadingWithMessageProps> = ({ message }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-gray-700">{message}</p>
      </div>
    </div>
  );
};

export default LoadingWithMessage;
