import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "styled-components";
import Router from "./Router";
import GlobalFont from "./styles/GlobalFont";
import GlobalStyle from "./styles/GlobalStyle";
import theme from "./styles/theme";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <>
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <GlobalFont />
      <Router />
    </ThemeProvider>
  </>
);
