import React from "react"
import styled from "styled-components"
import { Wrapper } from "./style"

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
  margin-bottom: 300px;
  text-align: center;
`
const BubbleTheory: any = () => {
  return (
    <Wrapper>
      <Flex>
        <div>
          <h1>Bubble sort (Sortowanie bąbelkowe)</h1>
          <br />
          <span>
          Sortowanie bąbelkowe jest o złożoności czasowej O(n^2) i pamięciowej O(1).
          </span>
          <br />
          <br />
          <span>
          Polega na porównywaniu dwóch sąsiednich elementów i zamianie ich kolejności, jeżeli następny 
          element tablicy jest większy od aktualnego. Sortowanie kończy się, gdy podczas kolejnego 
          przejścia nie dokonano żadnej zmiany.
          </span>
          <br />
          <img src="images/bubble-sort.PNG" alt="Sortowanie bąbelkowe" width="500" height="600"></img>
        </div>
      </Flex>
    </Wrapper>
  )
}

export default BubbleTheory
