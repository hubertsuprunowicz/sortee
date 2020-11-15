import { graphql, useStaticQuery } from "gatsby"
import React, {
  createRef,
  useEffect,
  useMemo,
  useState,
  useCallback,
  forwardRef,
} from "react"
import { Layout } from "../compontents/Layout"
import styled from "styled-components"
import { rem, theme } from "../theme"
import anime from "animejs"
import { motion } from "framer-motion"
import { Box } from "../compontents/Box"
import FlipMove from "react-flip-move"

const Wrapper = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  align-items: center;
  height: 100%;
`
const TextHolder = styled.div`
  margin-top: 40px;
  max-width: 600px;
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

const ButtonNext = styled(motion.button)`
  max-width: 125px;
  max-height: 75px;

  min-width: 80px;
  width: 10vw;
  min-height: 50px;
  height: 7vw;

  svg {
    width: 70%;
    height: 70%;
  }

  background: #ffffff;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 42px;
  outline: none;
  border: none;
  position: absolute;
  bottom: 20px;

  :hover {
    cursor: pointer;
  }
`

type SortValue = {
  id: number
  value: number
}

const TOTAL = 5

var initIndex = 0
const numArr: SortValue[] = Array.from({ length: TOTAL }, () => {
  return {
    id: initIndex++,
    value: Math.floor(Math.random() * 40),
  }
})

const QuickSort: React.FC<{ path: string }> = () => {
  const [divide, setDivide] = useState(0)
  const [divideArr, setDivideArr] = useState(0)
  const [step, setStep] = useState(0)
  const [pivot, setPivot] = useState(Math.floor(numArr.length / 2))

  const [toSortArr, setToSortArr] = useState<any[][][]>([
    // First step, before `divide nad conquer` logic
    [numArr],
    // At this moment, there are maxmum 2 possibilites.
    // Previous array will be divided into 1 or 2 pieces
    // depends on extremes of pivot (left, right or in-betweeen)
    [[], []],
    [[], [], [], []],
    // Maximum probability for size of 8 numbers
    [[], [], [], [], [], [], [], []],
  ])

  const middle = Math.floor(numArr.length / 2)

  const handleQuickAlgorithmNextStep = () => {
    // swap last with middle-one
    if (step === 0) {
      setToSortArr(old => {
        ;[old[0][0][middle], old[0][0][numArr.length - 1]] = [
          old[0][0][numArr.length - 1],
          old[0][0][middle],
        ]

        return old
      })
    }

    if (step === 1) {
      let smaller: SortValue[] = []
      let larger: SortValue[] = []
      let tempPivot = middle

      const cpyOfArrToRead = toSortArr[0][0].slice(0)

      for (let index = 0; index < numArr.length; index++) {
        if (index === tempPivot) continue

        if (cpyOfArrToRead[index].value <= cpyOfArrToRead[tempPivot].value) {
          smaller.push(cpyOfArrToRead[index])
        } else {
          larger.push(cpyOfArrToRead[index])
        }
      }

      setPivot(tempPivot)
      setToSortArr(old => {
        old[0][0] = [...smaller, cpyOfArrToRead[tempPivot], ...larger]
        old[1][0] = [...smaller]
        old[1][1] = [...larger]
        return old
      })
    }

    // divide and conquer
    if (step === 3) {
      setDivide(old => old + 1)
    }

    setStep(old => old + 1)
  }

  const handleIsActive = useCallback(
    (index: number) => {
      if (step === 0) {
        return index === TOTAL - 1
      }

      if (step >= 1) {
        return index === pivot
      }

      return false
    },
    [pivot]
  )

  console.log("pivot")
  console.log(pivot)

  console.log("Object.values(toSortArr)")
  console.log(toSortArr)

  return (
    <Wrapper>
      {/* TODO: GraphQL query from json */}
      <TextHolder>
        <h2>Select the pivot. (last-one)</h2>
      </TextHolder>

      {/* 1ST ROW */}
      <BoxHolder>
        <FlipMove>
          {toSortArr[0][0].map(({ id, value }, index) => (
            <Box isActive={handleIsActive(id)} key={id}>
              {value}
            </Box>
          ))}
        </FlipMove>
      </BoxHolder>

      {/* 2ND ROW */}
      {toSortArr?.[1]?.[0] && (
        <BoxHolder>
          <FlipMove>
            {/* 1ST COLUMN */}
            {toSortArr?.[1]?.[0] &&
              Object.values(toSortArr[1][0]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id)} key={id}>
                  {value}
                </Box>
              ))}

            <div
              style={{ width: "50px", height: "50px", marginRight: "5px" }}
            />

            {/* 2ND COLUMN */}
            {toSortArr?.[1]?.[1] &&
              Object.values(toSortArr[1][1]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id)} key={id}>
                  {value}
                </Box>
              ))}
          </FlipMove>
        </BoxHolder>
      )}

      {/* 3RD ROW */}
      {toSortArr?.[2]?.[0] && (
        <BoxHolder>
          <FlipMove>
            {Object.values(toSortArr[2][0]).map(({ id, value }, index) => (
              <Box isActive={handleIsActive(id)} key={id}>
                {value}
              </Box>
            ))}
          </FlipMove>
        </BoxHolder>
      )}

      {/* 4ND ROW */}
      {toSortArr?.[2]?.[0] && (
        <BoxHolder>
          <FlipMove>
            {Object.values(toSortArr[2][0]).map(({ id, value }, index) => (
              <Box isActive={handleIsActive(id)} key={id}>
                {value}
              </Box>
            ))}
          </FlipMove>
        </BoxHolder>
      )}

      <ButtonNext onClick={handleQuickAlgorithmNextStep}>
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

export default QuickSort
