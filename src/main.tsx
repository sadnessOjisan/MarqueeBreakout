import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./containers/App";
import { createGlobalStyle } from "styled-components";


const GlobalStyle = createGlobalStyle`
  *,
*:after,
*:before {
    margin: 0;
    padding: 0;
    box-sizing: inherit;
}

html {
    font-size: 62.5%;
    width: 100%;
    height: 100%;
}
`;

ReactDOM.render(
  <App>
    <GlobalStyle />
  </App>,
  document.getElementById("root")
);
