import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

  @import url('https://fonts.googleapis.com/css?family=Quicksand:300,500,700&display=swap');

  body {
    background: linear-gradient(to right, rgba(255,200,0,1) 0%, rgba(255,111,0,1) 100%);
  }
`;

export default GlobalStyle;
