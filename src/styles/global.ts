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

  p { margin: 0; }
`;
