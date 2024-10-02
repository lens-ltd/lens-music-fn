import { Routes, Route } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import UserDashboard from './pages/dashboard/UserDashboard';
import Home from './pages/dashboard/Home';
import AuthenticatedRoutes from './outlets/AuthenticatedRoutes';
import ListArtists from './pages/artists/ListArtists';

const Router = () => {
  return (
    <>
      <Routes>
        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* AUTHENTICATION */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />

        {/* AUTHENTICATED ROUTES */}
        <Route element={<AuthenticatedRoutes />}>
          {/* DASHBOARD */}
          <Route path="/dashboard" element={<UserDashboard />} />

          {/* ARTIST ROUTES */}
          <Route path="/artists">
            <Route path="" element={<ListArtists />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
