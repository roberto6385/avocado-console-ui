import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    color: ${(props) => props.theme.basic.default.font.color};
  }
  
  * {
    border-color: ${(props) => props.theme.basic.default.border.color};
  }
`;

export default GlobalStyle;
