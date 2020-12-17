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

const Separator = styled.div`
  width: 50px;
  height: 50px;
  margin-right: 5px;
`

const BoxHolder = styled.div<{ isSmaller: boolean }>`
  margin-top: 0px;

  > div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;

    .box {
      ${props => {
        if (props.isSmaller) {
          return {
            width: "15px",
            height: "15px",
            fontSize: theme.fontSizes[6] + "rem",
          }
        }
      }}
    }

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
  const [step, setStep] = useState(0)
  const [pivotIter, setPivotIter] = useState(1)
  const [pivot, setPivot] = useState<number[][]>([
    [Math.floor(numArr.length / 2)],
    [-1],
    [-1],
    [-1],
    [-1],
    [-1],
    [-1],
  ])

  const [toSortArr, setToSortArr] = useState<any>([
    // First step, before `divide and conquer` logic
    [numArr],
    // At this moment, there are maxmum 2 possibilites.
    // Previous array will be divided into 1 or 2 pieces
    // depends on extremes of pivot (left, right or in-betweeen)
    [[], []],
    [[], [], [], [], [], [], [], []],
    // Maximum probability for size of 8 numbers
    [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
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

      setPivot(old => {
        old[0][0] = toSortArr[0][0][middle].id
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

      // divide and conquer
      setToSortArr(old => {
        old[0][0] = [...smaller, cpyOfArrToRead[tempPivot], ...larger]
        old[1][0] = [...smaller]
        old[1][1] = [...larger]
        return old
      })

      setDivide(old => old + 1)
    }

    // set pivot for divided arrays - second row
    if (step === 2) {
      toSortArr[1].forEach((it, index) => {
        if (it.length > 0) {
          setPivot(old => {
            old[1][index] = it[it.length - 1].id
            return [...old]
          })
          setPivotIter(old => old + 1)
        }
      })
    }

    // sort divided arrays
    if (step === 3) {
      toSortArr[1].forEach((it, index) => {
        if (it.length > 0) {
          sortArr(index)
        }
      })

      setDivide(old => old + 1)
    }

    // set pivot for divided arrays - third row
    if (step === 4) {
      toSortArr[2].forEach((it, index) => {
        if (it.length > 0) {
          setPivot(old => {
            old[2][index] = it[it.length - 1].id
            return [...old]
          })

          setPivotIter(old => old + 1)
        }
      })
    }

    // sort divided arrays
    if (step === 5) {
      toSortArr[2].forEach((it, index) => {
        if (it.length > 0) {
          sortArr(index)
        }
      })

      setDivide(old => old + 1)
    }

    // set pivot for divided arrays - fourth row
    if (step === 6) {
      toSortArr[3].forEach((it, index) => {
        if (it.length > 0) {
          setPivot(old => {
            old[3][index] = it[it.length - 1].id
            return [...old]
          })
          setPivotIter(old => old + 1)
        }
      })
    }

    // sort divided arrays
    if (step === 7) {
      toSortArr[3].forEach((it, index) => {
        if (it.length > 0) {
          sortArr(index)
        }
      })

      setDivide(old => old + 1)
    }

    // set pivot for divided arrays - fifth row
    if (step === 8) {
      toSortArr[4].forEach((it, index) => {
        if (it.length > 0) {
          setPivot(old => {
            old[4][index] = it[it.length - 1].id
            return [...old]
          })
          setPivotIter(old => old + 1)
        }
      })
    }

    // sort divided arrays
    if (step === 9) {
      toSortArr[4].forEach((it, index) => {
        if (it.length > 0) {
          sortArr(index)
        }
      })

      setDivide(old => old + 1)
    }

    // Indexing
    setStep(old => old + 1)
  }

  console.log("step", step)
  console.log("toSortArr")
  console.log(toSortArr)
  console.log("pivot")
  console.log(pivot)

  const sortArr = (indexOfArr: number) => {
    let smaller: SortValue[] = []
    let larger: SortValue[] = []

    const cpyOfArrToRead = toSortArr[divide][indexOfArr].slice(0)
    const tempPivot = cpyOfArrToRead.length - 1

    for (let index = 0; index < cpyOfArrToRead.length; index++) {
      if (index === tempPivot) continue

      if (cpyOfArrToRead[index].value <= cpyOfArrToRead[tempPivot].value) {
        smaller.push(cpyOfArrToRead[index])
      } else {
        larger.push(cpyOfArrToRead[index])
      }
    }

    // divide and conquer
    setToSortArr(old => {
      old[divide][indexOfArr] = [
        ...smaller,
        cpyOfArrToRead[tempPivot],
        ...larger,
      ]

      console.log("\n")
      console.log(smaller)
      console.log(tempPivot)
      console.log(larger)
      console.log("\n")

      old[divide + 1][indexOfArr + indexOfArr] = [...smaller]
      old[divide + 1][indexOfArr + indexOfArr + 1] = [...larger]
      return old
    })
  }

  const handleIsActive = (index: number, pivot: number) => {
    if (step === 0) {
      return index === TOTAL - 1
    }

    if (step >= 1) {
      return index === pivot
    }

    return false
  }

  // End handler
  useEffect(() => {
    if (pivotIter === TOTAL) {
      console.log("Endied")
    }
  }, [pivotIter])

  return (
    <Wrapper>
      {/* TODO: GraphQL query from json */}
      <TextHolder>
        <h2>Select the pivot. (last-one)</h2>
      </TextHolder>

      {/* 1ST ROW */}
      <BoxHolder isSmaller={divide > 0}>
        <FlipMove>
          {toSortArr[0][0].map(({ id, value }, index) => (
            <Box isActive={handleIsActive(id, pivot?.[0]?.[0])} key={id}>
              {value}
            </Box>
          ))}
        </FlipMove>
      </BoxHolder>

      {/* 2ND ROW */}
      {toSortArr?.[1]?.[0] && (
        <BoxHolder isSmaller={divide > 1}>
          <FlipMove>
            {/* 1ST COLUMN */}
            {toSortArr?.[1]?.[0] &&
              Object.values(toSortArr[1][0]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[1]?.[0])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 2ND COLUMN */}
            {toSortArr?.[1]?.[1] &&
              Object.values(toSortArr[1][1]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[1]?.[1])} key={id}>
                  {value}
                </Box>
              ))}
          </FlipMove>
        </BoxHolder>
      )}

      {/* 3RD ROW */}
      {toSortArr?.[2]?.[0] && (
        <BoxHolder isSmaller={divide > 2}>
          <FlipMove>
            {/* 1ST COLUMN */}
            {toSortArr?.[2]?.[0] &&
              Object.values(toSortArr[2][0]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[2]?.[0])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 2ND COLUMN */}
            {toSortArr?.[2]?.[1] &&
              Object.values(toSortArr[2][1]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[2]?.[1])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 3RD COLUMN */}
            {toSortArr?.[2]?.[2] &&
              Object.values(toSortArr[2][2]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[2]?.[2])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 4TH COLUMN */}
            {toSortArr?.[2]?.[3] &&
              Object.values(toSortArr[2][3]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[2]?.[3])} key={id}>
                  {value}
                </Box>
              ))}
          </FlipMove>
        </BoxHolder>
      )}

      {/* 4TH ROW */}
      {toSortArr?.[3]?.[0] && (
        <BoxHolder isSmaller={divide > 3}>
          <FlipMove>
            {/* 1ST COLUMN */}
            {toSortArr?.[3]?.[0] &&
              Object.values(toSortArr[3][0]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[3]?.[0])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 2ND COLUMN */}
            {toSortArr?.[3]?.[1] &&
              Object.values(toSortArr[3][1]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[3]?.[1])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 3RD COLUMN */}
            {toSortArr?.[3]?.[2] &&
              Object.values(toSortArr[3][2]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[3]?.[2])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 4TH COLUMN */}
            {toSortArr?.[3]?.[3] &&
              Object.values(toSortArr[3][3]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[3]?.[3])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 5TH COLUMN */}
            {toSortArr?.[3]?.[4] &&
              Object.values(toSortArr[3][4]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[3]?.[4])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 6TH COLUMN */}
            {toSortArr?.[3]?.[5] &&
              Object.values(toSortArr[3][5]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[3]?.[5])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 7TH COLUMN */}
            {toSortArr?.[3]?.[6] &&
              Object.values(toSortArr[3][6]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[3]?.[6])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 8TH COLUMN */}
            {toSortArr?.[3]?.[7] &&
              Object.values(toSortArr[3][7]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[3]?.[7])} key={id}>
                  {value}
                </Box>
              ))}
          </FlipMove>
        </BoxHolder>
      )}

      {/* 5TH ROW */}
      {toSortArr?.[4]?.[0] && (
        <BoxHolder isSmaller={divide > 4}>
          <FlipMove>
            {/* 1ST COLUMN */}
            {toSortArr?.[4]?.[0] &&
              Object.values(toSortArr[4][0]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[4]?.[0])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 2ND COLUMN */}
            {toSortArr?.[4]?.[1] &&
              Object.values(toSortArr[4][1]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[4]?.[1])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 3RD COLUMN */}
            {toSortArr?.[4]?.[2] &&
              Object.values(toSortArr[4][2]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[4]?.[2])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 4TH COLUMN */}
            {toSortArr?.[4]?.[3] &&
              Object.values(toSortArr[4][3]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[4]?.[3])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 5TH COLUMN */}
            {toSortArr?.[4]?.[4] &&
              Object.values(toSortArr[4][4]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[4]?.[4])} key={id}>
                  {value}
                </Box>
              ))}

            <Separator />

            {/* 6TH COLUMN */}
            {toSortArr?.[4]?.[5] &&
              Object.values(toSortArr[4][5]).map(({ id, value }, index) => (
                <Box isActive={handleIsActive(id, pivot?.[4]?.[5])} key={id}>
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
