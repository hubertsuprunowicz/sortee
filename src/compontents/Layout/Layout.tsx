import { graphql, useStaticQuery } from 'gatsby';
import React, { useRef } from 'react';
import { Provider } from 'reakit';
import styled from "styled-components"
import { GlobalStyle, theme } from '../../theme';

const SiteLayout = styled.div`
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;

  & > main {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding-bottom: 52px;
    @media only screen and (min-width: ${theme.breakpoints[3]}px) {
      padding-bottom: 0;
    }
    @media only screen and (min-width: ${theme.breakpoints[2]}px) {
      padding-bottom: 90px;
    }
  }
  position: relative;

  #top-left-icon {
    position: fixed;
    top: 0;
    left: 0;
    fill: ${theme.colors.backgroundShapes};
    z-index: -1000;
    pointer-events: none;
  }

  #bottom-right-icon {
    position: fixed;
    bottom: 0;
    right: 0;
    fill: ${theme.colors.backgroundShapes};
    z-index: -1000;
    pointer-events: none;
  }
`;

const Layout: React.FC = ({ children }) => {
  return (
    <Provider>
      <SiteLayout>
        <GlobalStyle />
        <main>{children}</main>
      </SiteLayout>
    </Provider>
  );
};

export default Layout;
