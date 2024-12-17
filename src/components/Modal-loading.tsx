import React from 'react';

interface LoadingWithMessageProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const LoadingWithMessage: React.FC<LoadingWithMessageProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl mb-4">{message}</h3>
        <div className="flex justify-between">
          <button
            onClick={onConfirm}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            Yes
          </button>
          <button
            onClick={onCancel}
            className="bg-indigo-500 text-white px-4 py-2 rounded-md"
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadingWithMessage;
