import { graphql, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import Img from "gatsby-image"
import { Wrapper } from "../templates/style"
import { Layout } from "../compontents/Layout"
import Image from "../data/images/bubble-sort.png"

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 70%;
  height: 100%;
  margin-bottom: 300px;
  text-align: center;
`

const Button = styled.button`
  max-width: 125px;
  max-height: 75px;

  min-width: 80px;
  width: 10vw;
  min-height: 50px;
  height: 7vw;

  background: #ffffff;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 42px;
  outline: none;
  border: none;
  position: absolute;
  bottom: 40px;

  :hover {
    cursor: pointer;
  }
`

const BubbleTheoryPage: any = () => {
  const [displayImage, setDisplayImage] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/bubble-sort.PNG" }) {
        childImageSharp {
          fixed {
            ...GatsbyImageSharpFixed
          }
        }
      }
    }
  `)

  return (
    <Layout>
      <Wrapper>
        <Flex>
          <div>
            <h1>Bubble sort (Sortowanie bąbelkowe)</h1>
            {displayImage ? (
              <img src={Image} alt="Sortowanie bąbelkowe"></img>
            ) : (
              <>
                <span>
                  Sortowanie bąbelkowe jest o złożoności czasowej O(n^2) i
                  pamięciowej O(1).
                </span>
                <br />
                <br />
                <span>
                  Polega na porównywaniu dwóch sąsiednich elementów i zamianie
                  ich kolejności, jeżeli następny element tablicy jest większy
                  od aktualnego. Sortowanie kończy się, gdy podczas kolejnego
                  przejścia nie dokonano żadnej zmiany.
                </span>
              </>
            )}
          </div>
        </Flex>
        <Button onClick={() => setDisplayImage(old => !old)}>
          <b>{displayImage ? "Pokaż treść" : "Pokaż zdjęcie"}</b>
        </Button>
      </Wrapper>
    </Layout>
  )
}

export default BubbleTheoryPage
