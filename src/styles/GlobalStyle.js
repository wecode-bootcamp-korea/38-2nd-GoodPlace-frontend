import { createGlobalStyle } from "styled-components";
import { reset } from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset};
  *{
    box-sizing: border-box;
  };
  button {
    cursor : pointer;
  };
  input {
    outline : none;
  };
`;

export default GlobalStyle;
