import React from 'react';
import ReactDOM from 'react-dom/client';
import { MantineProvider } from '@mantine/core';
import SettingsProvider from './Context/Settings/Settings.jsx';
import App from './App';
import LoginProvider from './Context/Auth/Auth.jsx';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS >
      <LoginProvider>
        <SettingsProvider>
          <App />
        </SettingsProvider>
      </LoginProvider>
    </MantineProvider>
  </React.StrictMode>
);
