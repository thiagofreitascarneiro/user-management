import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'phosphor-react'; // Ícones do Phosphor

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <label className="relative inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only peer"
        onChange={toggleTheme}
        checked={theme === 'dark'}
      />
      <div
        className={`w-20 h-10 rounded-full bg-gray-200 peer-checked:bg-gray-800 flex items-center justify-between px-2 transition-all duration-500`}
      >
        {/* Ícone de Sol */}
        <Sun
          size={24}
          weight="bold"
          className={`text-yellow-500 transition-opacity duration-500 ${
            theme === 'dark' ? 'opacity-0' : 'opacity-100'
          }`}
        />
        {/* Ícone de Lua */}
        <Moon
          size={24}
          weight="bold"
          className={`text-gray-300 transition-opacity duration-500 ${
            theme === 'dark' ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>
    </label>
  );
};

export default ThemeToggle;
