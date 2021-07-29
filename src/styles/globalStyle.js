import {createGlobalStyle} from 'styled-components';
import {borderColor, fontColor} from './color';

const GlobalStyle = createGlobalStyle`
  body {
    color: ${(props) => fontColor[props.theme_value]};
    border-color: ${(props) => borderColor[props.theme_value]};
  }
`;

export default GlobalStyle;
