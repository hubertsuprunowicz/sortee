import { motion } from "framer-motion"
import { useStaticQuery, graphql } from "gatsby"
import React, { useEffect, useState } from "react"
import FlipMove from "react-flip-move"
import styled from "styled-components"
import { Box } from "../compontents/Box"
import { theme } from "../theme"
import { ButtonNext, ButtonReset, Wrapper } from "../templates/style"
import { Layout } from "../compontents/Layout"

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

const SelectionSortPage: any = () => {
  const [step, setStep] = useState<number>(0)
  const [compareIndex, setCompareIndex] = useState(0)
  const [max, setMax] = useState(0)
  const [isEnd, setIsEnd] = useState(false)

  const TOTAL = 5
  const numArr = Array.from({ length: TOTAL }, () =>
    Math.floor(Math.random() * 40)
  )
  const initToSortArr = numArr.reduce<{ [key: number]: SortValue }>(
    (a, b, index) => ((a[index] = { id: index, value: b }), a),
    {}
  )

  const [toSortArr, setToSortArr] = useState<{
    [key: number]: SortValue
  }>(initToSortArr)
  const [lastIndex, setLastIndex] = useState(
    Object.values(toSortArr).length - 1
  )

  const data = useStaticQuery(graphql`
    query {
      allSelectionJson {
        nodes {
          step
          text
        }
      }
    }
  `)

  const handleSelectionAlgorithmNextStep = () => {
    if (isEnd) return
    if (step < 4) {
      setStep(old => old + 1)
      return
    }

    if (toSortArr[compareIndex].value > toSortArr[max].value) {
      setStep(6)
      setMax(compareIndex)
    } else {
      setStep(5)
    }

    setCompareIndex(old => old + 1)
  }

  useEffect(() => {
    if (compareIndex === lastIndex + 1) {
      setStep(7)

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
    } else {
      // setStep(8)
    }
  }, [compareIndex])

  useEffect(() => {
    if (lastIndex === 0) {
      setStep(9)
      setIsEnd(true)
    }
  }, [lastIndex])

  const handleReset = () => {
    setStep(0)
    setIsEnd(false)
    setMax(0)
    setCompareIndex(0)
    setToSortArr(initToSortArr)
    setLastIndex(Object.values(toSortArr).length - 1)
  }

  return (
    <Layout>
      <Wrapper>
        <ButtonReset onClick={handleReset}>
          <motion.svg
            width="70"
            height="70"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            whileHover={{ rotate: 360 }}
            transition={{ ease: "easeOut", duration: 0.6 }}
          >
            <path
              fill="black"
              d="M3.254,6.572c0.008,0.072,0.048,0.123,0.082,0.187c0.036,0.07,0.06,0.137,0.12,0.187C3.47,6.957,3.47,6.978,3.484,6.988c0.048,0.034,0.108,0.018,0.162,0.035c0.057,0.019,0.1,0.066,0.164,0.066c0.004,0,0.01,0,0.015,0l2.934-0.074c0.317-0.007,0.568-0.271,0.56-0.589C7.311,6.113,7.055,5.865,6.744,5.865c-0.005,0-0.01,0-0.015,0L5.074,5.907c2.146-2.118,5.604-2.634,7.971-1.007c2.775,1.912,3.48,5.726,1.57,8.501c-1.912,2.781-5.729,3.486-8.507,1.572c-0.259-0.18-0.618-0.119-0.799,0.146c-0.18,0.262-0.114,0.621,0.148,0.801c1.254,0.863,2.687,1.279,4.106,1.279c2.313,0,4.591-1.1,6.001-3.146c2.268-3.297,1.432-7.829-1.867-10.101c-2.781-1.913-6.816-1.36-9.351,1.058L4.309,3.567C4.303,3.252,4.036,3.069,3.72,3.007C3.402,3.015,3.151,3.279,3.16,3.597l0.075,2.932C3.234,6.547,3.251,6.556,3.254,6.572z"
            ></path>
          </motion.svg>
        </ButtonReset>
        <TextHolder>
          {step === 3 && (
            <h2>
              {data.allSelectionJson.nodes[step].text} {compareIndex}
            </h2>
          )}

          {step !== 3 && <h2>{data.allSelectionJson.nodes[step].text}</h2>}
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
    </Layout>
  )
}

export default SelectionSortPage
