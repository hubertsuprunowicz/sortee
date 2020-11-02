import { Link } from "gatsby"
import React, { useEffect } from "react"
import styled from "styled-components"
import { Layout } from "../compontents/Layout"
import { rem, theme } from "../theme"
import anime from "animejs/lib/anime.es.js"
import { Button } from "../compontents/Button"

const SquareHolder = styled.div`
  position: absolute;
  left: -5vw;
`

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
const platBtn = document.getElementById("play")
const stopBtn = document.getElementById("stop")

const animation = anime({
  targets: "#first-line",
  translateX: 270,
  delay: function (el: any, i: any) {
    return i * 100
  },
  direction: "alternate",
  loop: true,
  autoplay: false,
  easing: "easeInOutSine",
})

const Test: React.FC = () => {
  return (
    <div style={{ position: "absolute", top: 10 }} id="first-line">
      <span>Hardware</span>
    </div>
  )
}

const Square: React.FC = ({ children }) => {
  return (
    <div
      style={{
        // backgroundColor: "red",
        fontSize: "2rem",
        width: "50px",
        height: "50px",
        margin: "10px",
      }}
      className="el"
    >
      {children}
    </div>
  )
}

const IndexPage: React.FC = () => {
  const animationRef = React.useRef(HTMLDivElement)
  const arr = ["S", "O", "R", "T", "E", "E"]

  useEffect(() => {
    animationRef.current = anime({
      targets: "#first-line",
      translateX: 250,
      autoplay: false,
    })
  }, [])

  const handleAnimateIn = () => {
    if (animationRef.current) (animationRef as any).current.play()
  }

  const handleSquare = () => {
    anime({
      targets: ".el",
      translateX: "50vw",
      delay: anime.stagger(400, { easing: "easeOutQuad" }),
    })
  }

  return (
    <Layout>
      <SiteIntro>
        <SquareHolder>
          {arr.map(it => (
            <Square key={it}>{it}</Square>
          ))}
        </SquareHolder>
        <Button onClick={handleAnimateIn}>animate in</Button>
        <Button onClick={handleSquare}>animate square</Button>
        <Link to="/bubble/" activeClassName={"active-link"}>
          start
        </Link>
      </SiteIntro>
    </Layout>
  )
}

export default IndexPage
