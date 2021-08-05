import {createGlobalStyle} from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html, body {
    color: ${(props) => props.theme.basic.default.font.color};
  }
 
textarea{
    background:${(props) =>
		props.theme.basic.pages.textAreas.normalStyle.backgroundColor};
}
`;

export default GlobalStyle;
