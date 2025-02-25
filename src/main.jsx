import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

// ** MUI Imports
import { ThemeProvider, createTheme } from '@mui/material/styles';

// ** Third Party Imports
import { Toaster } from 'react-hot-toast';
import { ToastContainer } from 'react-toastify';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react'; // Import PersistGate
import { store, persistor } from './redux/store';

const baseTheme = createTheme();
// const isAuthenticated = useSelector(state => state.auth.isAuthenticated)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider theme={baseTheme}>
      <ToastContainer
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='light'
        className={'react-toastify'}
        closeButton={true}
      />
      <ToastContainer />
      <Toaster
        position='top-right'
        containerStyle={{
          top: 50,
        }}
        // containerStyle={{
        //   top: isAuthenticated ? 120 : 50
        // }}
        toastOptions={{ className: 'react-hot-toast' }}
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </ThemeProvider>
  </StrictMode>
);
