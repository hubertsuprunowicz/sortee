import { graphql, useStaticQuery } from "gatsby"
import React, { useState } from "react"
import styled from "styled-components"
import { Wrapper } from "./style"
import Img from "gatsby-image"

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

const BubbleTheory: any = () => {
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
    <Wrapper>
      <Flex>
        <div>
          <h1>Bubble sort (Sortowanie bąbelkowe)</h1>
          {displayImage ? (
            <Img
              fixed={data.file.childImageSharp.fixed}
              alt="Sortowanie bąbelkowe"
            />
          ) : (
            <>
              <span>
                Sortowanie bąbelkowe jest o złożoności czasowej O(n^2) i
                pamięciowej O(1).
              </span>
              <br />
              <br />
              <span>
                Polega na porównywaniu dwóch sąsiednich elementów i zamianie ich
                kolejności, jeżeli następny element tablicy jest większy od
                aktualnego. Sortowanie kończy się, gdy podczas kolejnego
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
  )
}

export default BubbleTheory
