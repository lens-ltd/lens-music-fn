import { Routes, Route } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import UserDashboard from './pages/dashboard/UserDashboard';

const Router = () => {
  return (
    <>
      <Routes>
        {/* AUTHENTICATION */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* DASHBOARD */}
        <Route path="/dashboard" element={<UserDashboard />} />
      </Routes>
    </>
  );
};

export default Router;
