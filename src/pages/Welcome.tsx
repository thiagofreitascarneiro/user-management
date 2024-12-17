import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Welcome: React.FC = () => {
  const { theme } = useTheme();
  const { user } = useAuth();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 ${
        theme === 'dark'
          ? 'bg-gray-900 text-white'
          : 'bg-gray-100 text-gray-900'
      }`}
    >
      <div
        className={`max-w-4xl w-full text-center rounded-lg shadow-md p-8 ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        }`}
      >
        <h1 className="text-4xl font-extrabold mb-4">
          Welcome, {user?.email || 'User'}!
        </h1>
        <p className="text-lg mb-6 leading-relaxed">
          You have successfully logged in to our{' '}
          <strong>User Management System</strong>. Here, you can manage, view,
          and update user data seamlessly. Stay organized and efficient with our
          intuitive back-office tools!
        </p>

        <div className="flex justify-center mb-6">
          <img
            src="https://via.placeholder.com/400x200"
            alt="Welcome"
            className="rounded-lg w-full max-w-md shadow-lg"
          />
        </div>

        <div>
          <button
            className={`px-6 py-2 font-medium text-white rounded-md ${
              theme === 'dark'
                ? 'bg-indigo-600 hover:bg-indigo-500'
                : 'bg-indigo-500 hover:bg-indigo-600'
            }`}
          >
            Explore the Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default Welcome;
