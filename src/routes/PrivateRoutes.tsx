import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import Welcome from '../pages/Welcome';

const PrivateRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/welcome" element={<Welcome />} />
    </Routes>
  );
};

export default PrivateRoutes;
