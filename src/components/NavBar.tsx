import React, { useState } from 'react';
import ThemeToggle from './ToggleMode';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth(); // Pega o usuário e a função de logout do AuthContext

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <nav className="flex justify-between items-center w-[92%] mx-auto py-4">
        {/* Logo */}
        <div>
          <img className="w-10 cursor-pointer" src={logo} alt="Logo" />
        </div>

        {/* Menu Links */}
        <div
          className={`nav-links md:static absolute bg-white dark:bg-gray-900 md:min-h-fit min-h-[60vh] left-0 
            ${menuOpen ? 'top-[70px]' : 'top-[-100%]'} md:w-auto w-full flex items-center px-5 transition-all duration-500`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-8 gap-6">
            {/* Dashboard - Aparece somente se o usuário estiver logado */}
            {user && (
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-gray-500 dark:hover:text-gray-300 transition-colors"
                >
                  Dashboard
                </a>
              </li>
            )}
            {/* Theme Toggle - Centralizado */}
            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>

        {/* User Info, Theme Toggle, and Auth Button */}
        <div className="flex items-center gap-6">
          {/* Nome do Usuário - Aparece apenas se estiver logado */}
          {user && (
            <span className="text-gray-800 dark:text-gray-300 font-medium">
              {user.email}
            </span>
          )}

          {/* Botão de Login ou Logout */}
          {user ? (
            <button
              onClick={logout}
              className="bg-red-500 text-white px-5 py-2 rounded-full hover:bg-red-600 transition-colors"
            >
              Log Out
            </button>
          ) : (
            <button
              className="bg-indigo-500 text-white px-5 py-2 rounded-full hover:bg-indigo-600 transition-colors"
              onClick={() => (window.location.href = '/login')}
            >
              Sign In
            </button>
          )}

          {/* Menu Hamburger */}
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
