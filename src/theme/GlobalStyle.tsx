import { createGlobalStyle } from "styled-components"
import { theme } from "./theme"

export const GlobalStyle = createGlobalStyle`

  html {
    font-size: 62.5%;
    box-sizing: border-box;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }

  body {
    margin:0;
    padding:0;
    height: 100%;
    min-height: 100vh;

    .active-topbar-link {
    color: ${theme.colors.topbar.link_active_button} !important;
    font-weight: ${theme.fontWeights[700]};
    }
  }

  * {
    /* font-family: "Baloo Thambi 2"; */
    font-family: "Baloo Thambi 2";
    /* font-size: 3rem; */
    font-weight: 400;
    /* letter-spacing: 1px; */
    /* font-style: italic; */
  }

  body {
    color: ${theme.colors.font.primary};

    /* Global font sizes and brakepoints */
    & h1 {
      font-size: ${theme.fontSizes[8]}rem;
    }
    & h2 {
      font-size: ${theme.fontSizes[5]}rem;
    }
    & h3 {
        font-size: ${theme.fontSizes[3]}rem;
      }
    & p {
      font-size: ${theme.fontSizes[3]}rem;
    }
    & a {
      font-size: ${theme.fontSizes[2]}rem;
    }

    & button {
      font-size: ${theme.fontSizes[2]}rem;
    }

    /* Tablet */
    @media only screen and (min-width: ${theme.breakpoints[3]}px) {
      & h1 {
        font-size: ${theme.fontSizes[9]}rem;
      }
    }

    /* Desktop */
    @media only screen and (min-width: ${theme.breakpoints[4]}px) {
      & h1 {
        font-size: ${theme.fontSizes[10]}rem;
      }

      & h2 {
        font-size: ${theme.fontSizes[6]}rem;
      }
    }
  }
`

export default GlobalStyle
