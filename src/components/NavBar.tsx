import React, { useState } from 'react';
import ThemeToggle from './ToggleMode';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <nav className="flex justify-between items-center w-[92%] mx-auto py-4">
        <div>
          <img
            className="w-16 cursor-pointer"
            src="https://cdn-icons-png.flaticon.com/512/5968/5968204.png"
            alt="Logo"
          />
        </div>

        <div
          className={`nav-links md:static absolute bg-white dark:bg-gray-900 md:min-h-fit min-h-[60vh] left-0 
            ${menuOpen ? 'top-[70px]' : 'top-[-100%]'} md:w-auto w-full flex items-center px-5 transition-all duration-500`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-8 gap-6">
            <li>
              <a
                href="#"
                className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                Products
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                Solution
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                Resource
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                Developers
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
              >
                Pricing
              </a>
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          <button className="bg-indigo-500 text-white px-5 py-2 rounded-full hover:bg-indigo-600 transition-colors">
            Sign in
          </button>
          <ThemeToggle />

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl cursor-pointer md:hidden focus:outline-none"
          >
            {menuOpen ? '✖️' : '☰'}
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
