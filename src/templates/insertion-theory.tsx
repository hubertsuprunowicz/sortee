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

const InsertionTheory: any = () => {
  return <Wrapper>
  <Flex>
    <div>
      <h1>Insertion sort (Sortowanie przez wstawianie)</h1>
      <br />
      <span>
      Sortowanie przez wstawianie jest efektywne dla niewielkiej liczby elementów, 
      jego złożoność wynosi O(n^2).
      </span>
      <br />
      <span>
      Zasada działania odzwierciedla sposób w jaki ludzie ustawiają karty – kolejne 
      elementy wejściowe są ustawiane na odpowiednie miejsca docelowe.</span> <br />
      <span>Schemat działania algorytmu:
      <ol>
        <li>Utwórz zbiór elementów posortowanych i przenieś do niego dowolny element ze zbioru nieposortowanego.</li>
        <li>Weź dowolny element ze zbioru nieposortowanego.</li>
        <li>Wyciągnięty element porównuj z kolejnymi elementami zbioru posortowanego, póki 
          nie napotkasz elementu równego lub elementu większego (jeśli chcemy otrzymać ciąg niemalejący) 
          lub nie znajdziemy się na początku/końcu zbioru uporządkowanego.</li>
        <li>Wyciągnięty element wstaw w miejsce, gdzie skończyłeś porównywać.</li>
        <li>Jeśli zbiór elementów nieuporządkowanych jest niepusty, wróć do punktu 2.</li>
      </ol>
      </span>
    </div>
  </Flex>
</Wrapper>
}

export default InsertionTheory
