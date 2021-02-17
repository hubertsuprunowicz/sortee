import { motion } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import FlipMove from "react-flip-move"
import styled from "styled-components"
import { Box } from "../compontents/Box"
import { theme } from "../theme"
import { ButtonNext, Wrapper } from "./style"

const Flex = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60%;
  height: 100%;
  margin-bottom: 300px;
  text-align: center;
  
`

const About: any = () => {
  return (
    <Wrapper>
      <Flex>
        <div>
          <h1>SortIt</h1>
          <br />
          <br />
          <span>
            Projekt został stworzony, żeby przedstawić aspekt wizualny
            algorytmów sortowania.
          </span>
          <br />
          <br />
          <span>
            Przedstawione tu zostało sortowanie bąbelkowe, szybkie, sortowanie
            przez wstawianie i wybieranie.
          </span>
        </div>
      </Flex>
    </Wrapper>
  )
}

export default About
