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

const InsertionTheory: any = () => {
  const [displayImage, setDisplayImage] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/insertion-sort.PNG" }) {
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
          <h1>Insertion sort (Sortowanie przez wstawianie)</h1>
          {displayImage ? (
            <Img
              fixed={data.file.childImageSharp.fixed}
              alt="Sortowanie przez wstawianie"
            />
          ) : (
            <>
              <span>
                Sortowanie przez wstawianie jest efektywne dla niewielkiej
                liczby elementów, jego złożoność wynosi O(n^2).
              </span>
              <br />
              <span>
                Zasada działania odzwierciedla sposób w jaki ludzie ustawiają
                karty – kolejne elementy wejściowe są ustawiane na odpowiednie
                miejsca docelowe.
              </span>{" "}
              <br />
              <span>
                Schemat działania algorytmu:
                <ol>
                  <li>
                    Utwórz zbiór elementów posortowanych i przenieś do niego
                    dowolny element ze zbioru nieposortowanego.
                  </li>
                  <li>Weź dowolny element ze zbioru nieposortowanego.</li>
                  <li>
                    Wyciągnięty element porównuj z kolejnymi elementami zbioru
                    posortowanego, póki nie napotkasz elementu równego lub
                    elementu większego (jeśli chcemy otrzymać ciąg niemalejący)
                    lub nie znajdziemy się na początku/końcu zbioru
                    uporządkowanego.
                  </li>
                  <li>
                    Wyciągnięty element wstaw w miejsce, gdzie skończyłeś
                    porównywać.
                  </li>
                  <li>
                    Jeśli zbiór elementów nieuporządkowanych jest niepusty, wróć
                    do punktu 2.
                  </li>
                </ol>
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

export default InsertionTheory
