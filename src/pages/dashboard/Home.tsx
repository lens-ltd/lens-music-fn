import { useSelector } from 'react-redux';
import { RootState } from '../../state/store';
import { Navigate } from 'react-router-dom';

const Home = () => {
  // STATE VARIABLESa
  const { token } = useSelector((state: RootState) => state.auth);

  if (!token) {
    return <Navigate to={'/auth/login'} />;
  } else {
    return <Navigate to={'/dashboard'} />;
  }
};

export default Home;
