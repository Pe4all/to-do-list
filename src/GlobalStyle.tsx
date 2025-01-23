import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    font-weight: lighter;
  }

  input {
    border: none;
    background-color: transparent;

    &:focus {
      outline: none;
    }

    &:hover {
      background-color: transparent;

    }
  }

  body {
    overflow-x: hidden;
  }

  button {
    all: unset;

    &:focus,
    &:active {
      outline: none;
      border: none;
      background-color: transparent;
      color: inherit;
    }
  }
`;

export default GlobalStyle;
