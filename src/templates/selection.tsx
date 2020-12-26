import { motion } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import FlipMove from "react-flip-move"
import styled from "styled-components"
import { Box } from "../compontents/Box"
import { theme } from "../theme"
import { ButtonNext, Wrapper } from "./style"

const TextHolder = styled.div`
  margin-top: 40px;
  max-width: 600px;
  height: 140px;
`

const BoxHolder = styled.div`
  margin-top: 60px;

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    @media only screen and (max-width: ${theme.breakpoints[2]}px) {
      margin-top: 0;
      h2 {
        font-size: ${theme.fontSizes[0]}rem !important;
      }
    }
  }
`

type SortValue = {
  id: number
  value: number
}

const TOTAL = 5
const numArr = Array.from({ length: TOTAL }, () =>
  Math.floor(Math.random() * 40)
)
const initToSortArr = numArr.reduce<{ [key: number]: SortValue }>(
  (a, b, index) => ((a[index] = { id: index, value: b }), a),
  {}
)

const SelectionSort: any = () => {
  const [step, setStep] = useState<number>(0)
  const [loop, setLoop] = useState<number>(0)
  const [compareIndex, setCompareIndex] = useState(0)
  const [max, setMax] = useState(0)
  const [isEnd, setIsEnd] = useState(false)

  const [toSortArr, setToSortArr] = useState<{
    [key: number]: SortValue
  }>(initToSortArr)
  const [lastIndex, setLastIndex] = useState(
    Object.values(toSortArr).length - 1
  )

  // const data = useStaticQuery(graphql`
  //   query {
  //     allInsertionJson {
  //       nodes {
  //         step
  //         text
  //       }
  //     }
  //   }
  // `)

  const handleSelectionAlgorithmNextStep = () => {
    if (isEnd) return

    if (toSortArr[compareIndex].value > toSortArr[max].value) {
      setMax(compareIndex)
    }

    if (compareIndex === lastIndex) {
      // Swap
      setToSortArr(old => {
        return {
          ...old,
          [lastIndex]: old[max],
          [max]: old[lastIndex],
        }
      })

      // Go back to init
      setCompareIndex(0)
      setMax(0)
      setLastIndex(old => old - 1)
      return
    }

    setCompareIndex(old => old + 1)
  }

  useEffect(() => {
    if (lastIndex === 0) {
      setIsEnd(true)
    }
  }, [lastIndex])

  return (
    <Wrapper>
      <TextHolder>
        <h2>TEXT</h2>
      </TextHolder>
      <BoxHolder>
        <FlipMove>
          {Object.values(toSortArr).map(({ id, value }, index) => (
            <Box
              bg={max === index ? "#1abc9c" : undefined}
              isActive={compareIndex === index && !isEnd}
              isDisabled={lastIndex < index || isEnd}
              key={id}
            >
              {value}
            </Box>
          ))}
        </FlipMove>
      </BoxHolder>
      <ButtonNext onClick={handleSelectionAlgorithmNextStep}>
        <motion.svg
          width="70"
          height="28"
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
    </Wrapper>
  )
}

export default SelectionSort
