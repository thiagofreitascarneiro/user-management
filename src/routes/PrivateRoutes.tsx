import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Dashboard from '../pages/Dashboard';
import Welcome from '../pages/Welcome';

const PrivateRoutes = () => {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
};

export default PrivateRoutes;
