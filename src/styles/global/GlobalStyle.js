import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    color: ${(props) => props.theme.basic.default.font.color};
  }
  
  *, *::before, *::after {
    border-color: ${(props) => props.theme.basic.default.border.color};
  }
  
  input, select, textarea{
      color: ${(props) => props.theme.basic.default.font.color};
}
`;

export default GlobalStyle;
