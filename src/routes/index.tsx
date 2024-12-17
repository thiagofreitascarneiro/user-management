import { Routes, Route } from 'react-router-dom';
import PublicRoutes from './PublicRoutes';
import PrivateRoutes from './PrivateRoutes';
import Header from '../components/NavBar';

const AppRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        {/* Public Routes */}
        <Route path="/*" element={<PublicRoutes />} />

        {/* Private Routes */}
        <Route path="/dashboard/*" element={<PrivateRoutes />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
