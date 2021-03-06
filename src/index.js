import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import { BrowserRouter as Router } from "react-router-dom";
import GlobalStyle from "./globalStyles";
import can_launch from "./browserVerification";
import OldBrowserAlert from "./components/OldBrowserAlert";

let app;
if (can_launch()) {
  app = (
    <ThemeProvider theme={theme}>
      <Router>
        <GlobalStyle />
        <App />
      </Router>
    </ThemeProvider>
  );
} else {
  app = <OldBrowserAlert />;
}

ReactDOM.render(app, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
