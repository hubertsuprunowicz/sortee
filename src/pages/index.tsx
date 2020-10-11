import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import { Layout } from "../compontents/Layout"
import { rem, theme } from "../theme"

const SiteIntro = styled.div`
  display: flex;
  flex: 1;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  #first-line {
    letter-spacing: 0.1em;
    font-weight: bold;
    line-height: 72px;
    font-size: ${rem(7)};
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  #second-line {
    color: ${theme.colors.primary};
    font-size: ${rem(6)};
    margin-top: 18px;
    letter-spacing: 1px;
  }

  @media only screen and (min-width: ${theme
      .breakpoints[0]}px) and (orientation: landscape) {
    #first-line {
      line-height: 48px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
  }

  @media only screen and (min-width: ${theme.breakpoints[3]}px) {
    #first-line {
      font-size: ${rem(10)};
      line-height: 48px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    #second-line {
      color: ${theme.colors.font.secondary};
    }
  }
`

const IndexPage = () => {
  return (
    <Layout>
      <SiteIntro>
        <div id="first-line">
          <span>Hardware</span>
          <span>Firmware</span>
        </div>
        <Link to="/" activeClassName={"active-link"}>
          link1
        </Link>
        <Link to="/about/" activeClassName={"active-link"}>
          link2
        </Link>
        <div id="second-line">We are IT!</div>
      </SiteIntro>
    </Layout>
  )
}

export default IndexPage
