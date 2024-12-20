import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'phosphor-react';

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="focus:outline-none transition-all duration-300"
      style={{
        transition: 'background-color 0.3s ease, transform 0.3s ease',
      }}
    >
      {theme === 'dark' ? (
        <Sun
          size={22}
          weight="bold"
          className="text-white transition-opacity duration-300"
          style={{
            opacity: theme === 'dark' ? 1 : 0,
            transition: 'opacity 0.3s ease',
            transform: 'scale(1.2)',
          }}
        />
      ) : (
        <Moon
          size={22}
          weight="bold"
          className="text-gray-800 transition-opacity duration-300"
          style={{
            opacity: theme === 'dark' ? 0 : 1,
            transition: 'opacity 0.3s ease',
            transform: 'scale(1.2)',
          }}
        />
      )}
    </button>
  );
};

export default ThemeToggle;
