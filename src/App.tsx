import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import './styles/normalize.css';

import Routes from './routes';
import GlobalStyle from './styles/global';

const App: React.FC = () => (
  <>
    <GlobalStyle />
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </>
);

export default App;
