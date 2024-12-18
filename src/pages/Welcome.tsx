import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { fetchUserById } from '../services/api';
import { useNavigate } from 'react-router-dom';

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

const Welcome: React.FC = () => {
  const { user } = useAuth();
  const [userData, setUserData] = useState<UserData | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (user?.id) {
      const fetchUser = async () => {
        try {
          const response = await fetchUserById(user.id as number);
          setUserData(response.data.data);
        } catch {
          console.error('Failed to fetch user data.');
        }
      };

      fetchUser();
    }
  }, [user?.id]);

  const handleDashboardRedirect = () => {
    navigate('/dashboard');
  };

  return (
    <section className="pb-12 min-h-screen bg-white dark:bg-slate-900">
      <div className="items-center pt-12 px-8 mx-auto max-w-7xl lg:px-16 md:px-12">
        <div className="justify-center w-full text-center lg:p-10 max-auto">
          <div className="justify-center w-full mx-auto">
            <div className="flex flex-col items-center justify-center max-w-xl gap-3 mx-auto lg:flex-row">
              <img
                className="w-32 h-32 rounded-full border dark:border-gray-600 border-[#E8E3F4]"
                src={userData?.avatar || 'https://via.placeholder.com/150'}
                alt="User Avatar"
              />
            </div>

            <p className="mt-4 sm:px-32 text-[#10172A] dark:text-white sm:text-xl text-sm font-semibold tracking-tighter">
              by @{userData?.email || 'User'}
            </p>

            <p className="sm:mt-8 mt-3 sm:px-44 text-[#10172A] dark:text-white text-4xl sm:text-6xl font-semibold tracking-tighter">
              Welcome{' '}
              <span className="underline leading-8 underline-offset-8 decoration-8 decoration-[#8B5CF6]">
                {userData?.first_name} {userData?.last_name}
              </span>{' '}
              To the Best Backoffice Platform.
            </p>

            <p className="sm:mt-8 mt-2.5 text-[#10172A] dark:text-white sm:px-72 sm:leading-loose text-lg font-normal tracking-tighter">
              Streamline your daily operations with ease. Our powerful
              backoffice system allows you to manage users, optimize workflows,
              and enhance productivity—all from one simple, intuitive platform.
              Let's take control of your business operations and elevate your
              team's efficiency!
            </p>
          </div>
        </div>
      </div>

      <div className="text-center space-x-4 mt-6">
        <button
          onClick={handleDashboardRedirect}
          className="bg-[#8B5CF6] translate-y-1 text-[#fff] sm:text-lg text-xs font-bold py-2.5 px-6 rounded-full inline-flex items-center"
        >
          <span>Go to Dashboard</span>
        </button>
      </div>
    </section>
  );
};

export default Welcome;
