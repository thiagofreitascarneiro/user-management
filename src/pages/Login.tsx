import React, { useState } from 'react';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { login as apiLogin } from '../services/api';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { theme } = useTheme();
  const [error, setError] = useState('');
  const { login } = useAuth();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await apiLogin(formData);
      login(response.data.token, { email: formData.email });
    } catch {
      setError('Invalid credentials. Please try again.');
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center ${
        theme === 'dark' ? 'bg-gray-900' : 'bg-gray-100'
      }`}
    >
      <div
        style={{
          boxShadow:
            '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        }}
        className={`max-w-lg w-full ${
          theme === 'dark' ? 'bg-gray-800' : 'bg-white'
        } rounded-lg shadow-xl overflow-hidden`}
      >
        <div className="p-8">
          <div className="flex justify-between items-center mb-4">
            <h2
              className={`text-center text-3xl font-extrabold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              Welcome Back
            </h2>
          </div>
          <p
            className={`mt-4 text-start ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Sign in to continue
          </p>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm">
              <div>
                <label className="sr-only" htmlFor="email">
                  Email address
                </label>
                <input
                  placeholder="Email address"
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    theme === 'dark'
                      ? 'border-gray-700 bg-gray-700 text-white'
                      : 'border-gray-300 bg-gray-200 text-gray-900'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  required
                  autoComplete="email"
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
              <div className="mt-4">
                <label className="sr-only" htmlFor="password">
                  Password
                </label>
                <input
                  placeholder="Password"
                  className={`appearance-none relative block w-full px-3 py-3 border ${
                    theme === 'dark'
                      ? 'border-gray-700 bg-gray-700 text-white'
                      : 'border-gray-300 bg-gray-200 text-gray-900'
                  } rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}
                  required
                  autoComplete="current-password"
                  type="password"
                  name="password"
                  id="password"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div>
              <button
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                type="submit"
              >
                Login
              </button>
            </div>
          </form>
        </div>
        <div
          className={`px-8 py-4 ${
            theme === 'dark' ? 'bg-gray-700' : 'bg-gray-100'
          } text-center`}
        >
          <span
            className={`${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            Don't have an account?
          </span>
          <a
            className="font-medium text-indigo-500 hover:text-indigo-400"
            href="/register"
          >
            Sign Up
          </a>
        </div>
      </div>
    </div>
  );
};

export default Login;
