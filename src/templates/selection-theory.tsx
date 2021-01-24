import React, { useState } from "react"
import { Wrapper } from "./style"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
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

const SelectionTheory: any = () => {
  const [displayImage, setDisplayImage] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/selection-sort.PNG" }) {
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
          <h1>Selection Sort (Sortowanie przez wybieranie)</h1>
          {displayImage ? (
            <Img
              fixed={data.file.childImageSharp.fixed}
              alt="Sortowanie przez wybór"
            />
          ) : (
            <>
              {" "}
              <span>
                Sortowanie przez wybieranie jest jedną z prostszych metod
                sortowania o złożoności O(n^2).
              </span>
              <br />
              <br />
              <span>
                Algorytm rozpoczynamy, chcąc umieścić element minimalny całej
                tablicy, na samym jej początku. Przechodzimy więc przez całą
                tablicę, szukając go. Gdy już go odnajdziemy, zamieniamy go
                miejscami z elementem znajdującym się na zerowej pozycji. Wiemy
                już, że najmniejszy z elementów w naszym zbiorze, znajduje się
                na początku, więc zerowym miejscem w tablicy nie musimy się już
                przejmować. Następny krok poszukiwania elementu minimalnego,
                zaczniemy więc nie od zerowej, a od pierwszej pozycji w tablicy,
                gdzie umieścimy kolejny minimalny element z rozpatrywanego
                podzbioru. Algorytm wykonujemy do momentu, gdy w kolejnej
                iteracji zaczynamy poszukiwanie minimalnego elementu na
                ostatniej pozycji tablicy. Otrzymujemy w ten sposób posortowany
                rosnąco zbiór.
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

export default SelectionTheory
