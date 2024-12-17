import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';

const PrivateRoutes = () => {
  //   const { isAuthenticated } = useAuth();

  //   if (!isAuthenticated) {
  //     return <Navigate to="/login" />;
  //   }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
    </Routes>
  );
};

export default PrivateRoutes;
