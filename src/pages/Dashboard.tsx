import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

const Dashboard: React.FC = () => {
  const { token } = useAuth();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>
      <h1>Dashboard</h1>

      {/* Conteúdo do dashboard */}
    </div>
  );
};

export default Dashboard;
