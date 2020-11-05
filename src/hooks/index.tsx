import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import { ToastProvider } from './toast';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>{children}</ToastProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
