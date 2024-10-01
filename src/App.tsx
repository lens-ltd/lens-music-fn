import Router from './Router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  return (
    <>
      <ToastContainer
        closeOnClick
        hideProgressBar
        autoClose={1500}
        position="top-right"
      />
      <Router />
    </>
  );
};

export default App;
