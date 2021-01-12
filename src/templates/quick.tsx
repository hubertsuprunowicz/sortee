import { graphql, useStaticQuery } from "gatsby"
import React, { useEffect, useState } from "react"
import styled from "styled-components"
import { theme } from "../theme"
import anime from "animejs"
import { motion } from "framer-motion"
import { Box } from "../compontents/Box"
import FlipMove from "react-flip-move"
import { Wrapper, ButtonNext } from "./style"

const TextHolder = styled.div`
  margin-top: 40px;
  max-width: 600px;
`

const Separator = styled.div`
  width: 65px;
  height: 65px;
  margin-right: 5px;
`

const BoxHolder = styled.div<{ isSmaller: boolean }>`
  margin-top: 0px;
  display: inline-flex;

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
  const [isEnd, setIsEnd] = useState(false)
  const [divide, setDivide] = useState(0)
  const [step, setStep] = useState(0)
  const [pivotIter, setPivotIter] = useState(1)
  const animationRef = React.useRef(null)
  const [pivot, setPivot] = useState<number[][]>([
    [Math.floor(numArr.length / 2)],
    [],
    [],
    [],
    [],
  ])

  const [toSortArr, setToSortArr] = useState<any[][][]>([
    // First step, before `divide and conquer` logic
    [numArr],
    // At this moment, there are maxmum 2 possibilites.
    // Previous array will be divided into 1 or 2 pieces
    // depends on extremes of pivot (left, right or in-betweeen)
    [[], []],
    [[], [], [], [], [], [], [], []],
    // Maximum probability for size of 8*2 numbers
    [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
    [[], [], [], [], [], [], [], [], [], [], [], [], [], [], [], []],
  ])

  const middle = Math.floor(numArr.length / 2)

  const data = useStaticQuery(graphql`
    query {
      allQuickJson {
        nodes {
          step
          text
        }
      }
    }
  `)

  const handleQuickAlgorithmNextStep = () => {
    if (isEnd) {
      animationRef.current.play()
      return
    }

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

      setStep(1)
      return
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
      setStep(2)
      return
    }

    if (step > 1) {
      if (step % 2 === 0) {
        toSortArr[divide].forEach((it, index) => {
          if (it.length > 0) {
            setPivot(old => {
              old[divide][index] = it[it.length - 1].id
              return [...old]
            })
            setPivotIter(old => old + 1)
          }
        })
        setStep(3)
        return
      } else {
        toSortArr[divide].forEach((it, index) => {
          if (it.length > 0) {
            sortArr(index)
          }
        })

        setDivide(old => old + 1)
      }
      setStep(4)
      return
    }

    // Indexing
    // setStep(old => old + 1)
  }

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
    if (pivotIter === TOTAL && !isEnd) {
      setIsEnd(true)
      setStep(5)

      animationRef.current = anime({
        targets: ".pivot",
        translateY: function (el) {
          const OFFSET = 260
          const toBottomHeight =
            window.innerHeight - OFFSET - el.getBoundingClientRect().y

          return toBottomHeight
        },
        translateX: function (el) {
          const sortedArr = numArr.map(it => it.value).sort((a, b) => a - b)
          const value: string = el.innerHTML
          const currentX = el.getBoundingClientRect().x
          const middleBottom = window.innerWidth / 2 - currentX

          return (
            middleBottom -
            200 +
            sortedArr.findIndex(it => it === Number(value)) * 120
          )
        },
        loop: false,
        direction: "alternate",
        easing: "easeInOutSine",
      })
    }
  }, [pivotIter])

  return (
    <Wrapper>
      {/* TODO: GraphQL query from json */}
      <TextHolder>
        <h2> {data.allQuickJson.nodes[step].text} </h2>
      </TextHolder>

      {toSortArr.map((row, rowIndex) => (
        <BoxHolder key={rowIndex} isSmaller={divide > rowIndex || isEnd}>
          {row.map((col, colIndex) => (
            <FlipMove key={colIndex}>
              {col.map(({ id, value }, index) => (
                <Box
                  key={id}
                  id={rowIndex + "-" + colIndex + "-" + index}
                  className={
                    handleIsActive(id, pivot?.[rowIndex]?.[colIndex]) && "pivot"
                  }
                  isActive={handleIsActive(id, pivot?.[rowIndex]?.[colIndex])}
                >
                  {value}
                </Box>
              ))}
              {col.length > 0 && <Separator />}
            </FlipMove>
          ))}
        </BoxHolder>
      ))}

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
