import React from "react"
import { Wrapper } from "./style"
import styled from "styled-components"

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
  margin-bottom: 300px;
  text-align: center;
`
const QuickTheory: any = () => {
  return <Wrapper>
  <Flex>
    <div>
      <h1>Quick sort (Sortowanie szybkie)</h1>
      <br />
      <br />
      <span>
      Algorytm sortowania szybkiego jest wydajny: jego średnia złożoność obliczeniowa jest rzędu O(nlogn).
      </span>
      <br />
      <br />
      <span>
      Algorytm wykorzystuje technikę "dziel i zwyciężaj". Według ustalonego schematu wybierany jest 
      jeden element w sortowanej tablicy, który będziemy nazywać pivot. 
      Pivot może być elementem środkowym, pierwszym, ostatnim, losowym lub wybranym według jakiegoś 
      innego schematu dostosowanego do zbioru danych. Następnie ustawiamy elementy nie większe na lewo 
      tej wartości, natomiast nie mniejsze na prawo. W ten sposób powstaną nam dwie części tablicy 
      (niekoniecznie równe), gdzie w pierwszej części znajdują się elementy nie większe od drugiej. 
      Następnie każdą z tych podtablic sortujemy osobno według tego samego schematu. 
      </span>
    </div>
  </Flex>
</Wrapper>
}

export default QuickTheory
