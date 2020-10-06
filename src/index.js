import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import theme from 'Styles/theme';
import Routes from 'Routes';

ReactDOM.render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Routes />
  </ThemeProvider>,
  // </React.StrictMode>,
  document.getElementById('root'),
);
