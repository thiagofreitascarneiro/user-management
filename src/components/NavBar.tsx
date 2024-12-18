import React, { useState } from 'react';
import ThemeToggle from './ToggleMode';
import logo from '../assets/logo.png';
import { useAuth } from '../context/AuthContext';
import { Power } from 'phosphor-react';
import LoadingWithMessage from '../components/Modal-loading';

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, logout } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleLogoutClick = () => {
    setIsModalOpen(true);
  };

  const handleConfirmLogout = () => {
    logout();
    setIsModalOpen(false);
  };

  const handleCancelLogout = () => {
    setIsModalOpen(false);
  };

  return (
    <header className="bg-white dark:bg-gray-900 shadow">
      <nav className="flex justify-between items-center w-[92%] mx-auto py-4">
        <div>
          <img className="w-10 cursor-pointer" src={logo} alt="Logo" />
        </div>

        <div
          className={`nav-links md:flex md:justify-end flex-1 md:w-auto w-full absolute md:static bg-white dark:bg-gray-900 md:min-h-fit min-h-[60vh] left-0 
            ${menuOpen ? 'top-[70px]' : 'top-[-100%]'} md:flex-row flex-col items-center px-5 transition-all duration-500`}
        >
          <ul className="flex md:flex-row flex-col md:items-center md:gap-8 gap-6">
            {user && (
              <li>
                <a
                  href="/dashboard"
                  className="hover:text-gray-500 dark:hover:text-gray-300 dark:text-white transition-colors"
                >
                  Dashboard
                </a>
              </li>
            )}

            <li>
              <ThemeToggle />
            </li>
          </ul>
        </div>

        <div className="flex items-center gap-6">
          {user ? (
            <button
              onClick={handleLogoutClick} // Muda a função para abrir o modal
              className="text-indigo-500 hover:text-indigo-600 transition-colors"
            >
              <Power size={28} />
            </button>
          ) : (
            <button
              className="bg-indigo-500 text-white px-5 py-2 rounded-full hover:bg-indigo-600 transition-colors"
              onClick={() => (window.location.href = '/login')}
            >
              Sign In
            </button>
          )}

          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="text-3xl cursor-pointer md:hidden dark:text-white focus:outline-none"
          >
            {menuOpen ? '✖️' : '☰'}
          </button>
        </div>
      </nav>

      {isModalOpen && (
        <LoadingWithMessage
          message="Are you sure you want to log out?"
          onConfirm={handleConfirmLogout}
          onCancel={handleCancelLogout}
        />
      )}
    </header>
  );
};

export default Header;
