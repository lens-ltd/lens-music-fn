import { Routes, Route } from 'react-router-dom';
import Login from './pages/authentication/Login';
import Signup from './pages/authentication/Signup';
import UserDashboard from './pages/dashboard/UserDashboard';
import Home from './pages/dashboard/Home';
import AuthenticatedRoutes from './outlets/AuthenticatedRoutes';
import ListArtists from './pages/artists/ListArtists';
import ListLabels from './pages/labels/ListLabels';
import ListReleases from './pages/releases/ListReleases';

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

          {/* LABEL ROUTES */}
          <Route path="/labels">
            <Route path="" element={<ListLabels />} />
          </Route>

          {/* RELEASE ROUTES */}
          <Route path="/releases">
            <Route path="" element={<ListReleases />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default Router;
