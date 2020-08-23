import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
  }
  *,
  *::before,
  *::after {
    box-sizing: inherit;
  }
  body {
    margin: 0;
    padding-top: 80px ;
    padding-bottom: 50px;
    font-family: 'Montserrat';
    @media (max-width: 767px){
      padding-top: 30px;
      padding-bottom: 30px;
    }
  }
  button {
    padding: 0;
    cursor: pointer;
    font-family: 'Montserrat';
  }
  p {
    font-size: 18px;
  }
  
`

export default GlobalStyle
