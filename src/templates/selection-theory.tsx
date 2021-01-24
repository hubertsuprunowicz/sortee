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
const SelectionTheory: any = () => {
  return (
    <Wrapper>
    <Flex>
      <div>
        <h1>Selection Sort (Sortowanie przez wybieranie)</h1>
        <br />
        <span>
        Sortowanie przez wybieranie jest jedną z prostszych metod sortowania o złożoności O(n^2).
        </span>
        <br />
        <br />
        <span>
        Algorytm rozpoczynamy, chcąc umieścić element minimalny całej tablicy, 
        na samym jej początku. Przechodzimy więc przez całą tablicę, szukając go. 
        Gdy już go odnajdziemy, zamieniamy go miejscami z elementem znajdującym się na 
        zerowej pozycji. Wiemy już, że najmniejszy z elementów w naszym zbiorze, znajduje 
        się na początku, więc zerowym miejscem w tablicy nie musimy się już przejmować.
        Następny krok poszukiwania elementu minimalnego, zaczniemy więc nie od zerowej, a od pierwszej 
        pozycji w tablicy, gdzie umieścimy kolejny minimalny element z rozpatrywanego podzbioru. 
        Algorytm wykonujemy do momentu, gdy w kolejnej iteracji zaczynamy poszukiwanie minimalnego 
        elementu na ostatniej pozycji tablicy. Otrzymujemy w ten sposób posortowany rosnąco zbiór.
        </span>
      </div>
    </Flex>
  </Wrapper>
)
}

export default SelectionTheory
