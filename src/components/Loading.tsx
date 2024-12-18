import React from 'react';

const Loading = () => {
  return (
    <div className="flex dark:bg-slate-900 bg-white items-center justify-center min-h-screen">
      <div className="border-t-4 border-blue-500 border-solid rounded-full w-16 h-16 animate-spin"></div>
    </div>
  );
};

export default Loading;
