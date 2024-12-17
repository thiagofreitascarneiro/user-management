// src/components/CardUser.tsx
import React from 'react';
import { User } from '../@types/userTypes';
import { useTheme } from '../context/ThemeContext';

interface CardUserProps {
  user: User;
}

const CardUser: React.FC<CardUserProps> = ({ user }) => {
  const { theme } = useTheme();

  return (
    <div className="flex items-center justify-center ">
      <div
        className={`bg-white font-semibold text-center rounded-3xl border shadow-lg p-10 max-w-xs transform transition-all duration-300 hover:scale-105 hover:shadow-2xl cursor-pointer ${
          theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-gray-700'
        }`}
      >
        <img
          className="mb-3 w-32 h-32 rounded-full shadow-lg mx-auto"
          src={user.avatar}
          alt={`${user.first_name} ${user.last_name}`}
        />
        <h1 className="text-lg">
          {user.first_name} {user.last_name}
        </h1>
        <h3 className="text-sm text-gray-400">{user.email}</h3>
        <p className="text-xs text-gray-400 mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <button
          className={`bg-indigo-600 px-8 py-2 mt-8 rounded-3xl text-gray-100 font-semibold uppercase tracking-wide transition-colors duration-300 hover:bg-indigo-500 ${
            theme === 'dark' ? 'bg-indigo-500' : ''
          }`}
        >
          Hire Me
        </button>
      </div>
    </div>
  );
};

export default CardUser;
