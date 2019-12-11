import React from "react";
import ReactDOM from "react-dom";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import { AppProvider } from "./App/AppContext";
import App from "./App/App";

import './reset.css';

const theme = createMuiTheme({
  typography: {
    fontFamily: "GothamNarrow"
  },
  palette: {
    primary: {
      main: "#222",
    }
  },
  props: {
    MuiButtonBase: {
      disableRipple: true
    }
  },
  overrides: {
    MuiButton: {
      root: {
        fontSize: 14,
        fontWeight: 500,
        borderRadius: 20,
        textTransform: 'none',
        '&.active': {
          color: '#fff',
          backgroundColor: '#313131',
        },
        '&:hover': {
          backgroundColor: 'transparent',
        }
      },
    },
    MuiIconButton: {
      root: {
        padding: 0,
        '&:hover': {
          backgroundColor: 'none'
        }
      }
    }
  }
});

ReactDOM.render(
  <AppProvider>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </AppProvider>,
  document.getElementById("root")
);
