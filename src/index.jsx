import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRoutes from './routes/routes';
import { ToastContainer } from 'react-toastify';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <>
    <AppRoutes
    />
    <ToastContainer
      position="bottom-right"
      autoClose={3000}
      closeButton={true}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      delay={1000}
      limit={1}
    />
  </>
);
