import React, { useState } from "react"
import { Wrapper } from "../templates/style"
import styled from "styled-components"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"
import { Layout } from "../compontents/Layout"
import Image from "../data/images/quick-sort.png"

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

const QuickTheoryPage: any = () => {
  const [displayImage, setDisplayImage] = useState(false)
  const data = useStaticQuery(graphql`
    query {
      file(relativePath: { eq: "images/quick-sort.PNG" }) {
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
            <h1>Quick sort (Sortowanie szybkie)</h1>
            {displayImage ? (
              <img src={Image} height="520px" alt="Sortowanie szybkie"></img>
            ) : (
              <>
                <span>
                  Algorytm sortowania szybkiego jest wydajny: jego średnia
                  złożoność obliczeniowa jest rzędu O(nlogn).
                </span>
                <br />
                <br />
                <span>
                  Algorytm wykorzystuje technikę "dziel i zwyciężaj". Według
                  ustalonego schematu wybierany jest jeden element w sortowanej
                  tablicy, który będziemy nazywać pivot. Pivot może być
                  elementem środkowym, pierwszym, ostatnim, losowym lub wybranym
                  według jakiegoś innego schematu dostosowanego do zbioru
                  danych. Następnie ustawiamy elementy nie większe na lewo tej
                  wartości, natomiast nie mniejsze na prawo. W ten sposób
                  powstaną nam dwie części tablicy (niekoniecznie równe), gdzie
                  w pierwszej części znajdują się elementy nie większe od
                  drugiej. Następnie każdą z tych podtablic sortujemy osobno
                  według tego samego schematu.
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

export default QuickTheoryPage
