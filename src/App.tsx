import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './styles/normalize.css';

import Routes from './routes';
import GlobalStyle from './styles/global';
import AppProvider from './hooks';

const App: React.FC = () => (
  <BrowserRouter>
    <AppProvider>
      <Routes />
      <GlobalStyle />
    </AppProvider>
  </BrowserRouter>
);

export default App;
