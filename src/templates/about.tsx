import { motion } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import FlipMove from "react-flip-move"
import styled from "styled-components"
import { Box } from "../compontents/Box"
import { theme } from "../theme"
import { ButtonNext, Wrapper } from "./style"

const Flex = styled.div`
  margin-top: 40px;
  max-width: 600px;
  height: 140px;
`

const About: any = () => {
  return <Wrapper>About</Wrapper>
}

export default About
