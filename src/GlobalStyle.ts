import {
  higherSurface,
  placeholderTextColor,
  textColor,
} from "constants/theme";
import { createGlobalStyle } from "styled-components/macro";

export const GlobalStyle = createGlobalStyle`
  * {
  box-sizing: border-box;
}

input {
  background-color: ${higherSurface};
  color: ${textColor};
}

input::placeholder {
  color: ${placeholderTextColor};
}

/*!* Fluid Typography START *!*/
html {
  font-size: 16px;
  color: ${textColor};
}
@media screen and (min-width: 320px) {
  html {
    font-size: calc(16px + 6 * ((100vw - 320px) / 680));
  }
}
@media screen and (min-width: 1000px) {
  html {
    font-size: 22px;
  }
}

@media screen and (min-width: 2560px) {
  html {
    font-size: 30px;
  }
}
/* Fluid Typography END */

html, body, #root {
  height: 100%;
  width: 100%;
}

#root {
  display: flex;
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}

`;
