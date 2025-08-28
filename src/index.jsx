import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import App from './App.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import theme from './theme/theme.js';
import './styles/global.css';
import { Provider } from "react-redux";
import { store } from "./store/Store.js";   // simplified path

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);
