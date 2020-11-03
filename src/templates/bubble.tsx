import { graphql, useStaticQuery } from "gatsby"
import React, {
  createRef,
  useEffect,
  useMemo,
  useState,
  forwardRef,
} from "react"
import { Layout } from "../compontents/Layout"
import styled from "styled-components"
import { rem, theme } from "../theme"
import anime from "animejs"
import { motion } from "framer-motion"
import { Box } from "../compontents/Box"

const BoxHolder = styled.div`
  display: flex;
`

const ButtonNext = styled(motion.button)`
  width: 125px;
  height: 75px;
  background: #ffffff;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 42px;
  outline: none;
  border: none;
  position: relative;

  svg {
    transform: scale(0.7);
  }

  :hover {
    cursor: pointer;
  }
`

const BubbleSort: React.FC<{ path: string }> = () => {
  const numArr = Array.from({ length: 5 }, () => Math.floor(Math.random() * 40))
  const handleNext = () => {
    // TODO
  }

  return (
    <>
      {/* TODO: GraphQL query from json */}
      <h2>
        For each pass, we will move left to right swapping adjacent elements as
        needed. Each pass moves the next largest element into its final position
        (these will be shown in grey).
      </h2>
      <BoxHolder>
        {numArr.map(it => (
          <Box>{it}</Box>
        ))}
      </BoxHolder>
      <ButtonNext onClick={handleNext}>
        <motion.svg
          width="81"
          height="30"
          viewBox="0 0 81 30"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          whileHover={{ x: 50 }}
          transition={{ ease: "easeOut", duration: 0.6 }}
        >
          <path
            d="M80.4142 16.4142C81.1953 15.6332 81.1953 14.3668 80.4142 13.5858L67.6863 0.857872C66.9052 0.0768236 65.6389 0.0768234 64.8579 0.857872C64.0768 1.63892 64.0768 2.90525 64.8579 3.6863L76.1716 15L64.8579 26.3137C64.0768 27.0948 64.0768 28.3611 64.8579 29.1421C65.6389 29.9232 66.9052 29.9232 67.6863 29.1421L80.4142 16.4142ZM-2.39029e-07 17L79 17L79 13L2.39029e-07 13L-2.39029e-07 17Z"
            fill="black"
          />
        </motion.svg>
      </ButtonNext>
    </>
  )
}

export default BubbleSort
