import { createGlobalStyle } from "styled-components";
import Jalnan from "./fonts/Jalnan.ttf";
import GothicA1 from "./fonts/GothicA1-Black.ttf";

const GlobalFont = createGlobalStyle`
  @font-face {
    font-family : 'Jalnan';
    src : url(${Jalnan}) format('woff');
  }
  @font-face {
    font-family : 'GothicA1';
    src : url(${GothicA1}) format('woff');
  }
`;

export default GlobalFont;
