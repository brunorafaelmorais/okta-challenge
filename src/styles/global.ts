import { createGlobalStyle } from 'styled-components';

export default createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  body {
    background-color: ${({ theme }) => theme.colors.background};
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font-family: 'Roboto', sans-serif;
    color: ${({ theme }) => theme.colors.text};
  }

  a { text-decoration: none; }

  button { cursor: pointer; }

  figure, p, h1, h2, h3, h4, h5, h6 { margin: 0; }
`;
