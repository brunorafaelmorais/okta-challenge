import React from 'react';
import { ThemeProvider } from 'styled-components';

import theme from '../styles/theme';
import { ToastProvider } from './toast';
import { CampaignProvider } from './campaign';

const AppProvider: React.FC = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <ToastProvider>
        <CampaignProvider>{children}</CampaignProvider>
      </ToastProvider>
    </ThemeProvider>
  );
};

export default AppProvider;
