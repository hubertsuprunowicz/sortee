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

const LessButton = styled.button``
const GreaterButton = styled.button``
const Flex = styled.div`
  display: flex;
`

const Square = styled.div`
  font-size: 2rem;
  width: 50px;
  height: 50px;
  margin: 10px;
`

const SquareHolder = styled.ul`
  display: inline-flex;
  list-style-type: none;
  text-align: center;

  li {
    font-size: 2rem;
    width: 50px;
    height: 50px;
    margin: 10px;

    display: flex;
    justify-content: center;
    align-items: center;
  }

  .active {
    border: 2px solid black;
    border-radius: 50%;
  }
`

const randomArr = (length: number) =>
  Array.from({ length }, () => Math.floor(Math.random() * length))

const BubblePage: React.FC = () => {
  const [index, setIndex] = useState(0)
  const [arrToSort, setArrToSort] = useState([2, 1, 4, 5, 3, 0, 1])
  const [iterate, setIterate] = useState(arrToSort.length)
  // let arrToSort = [3, 1, 2, 4]

  let refs = useMemo(() => arrToSort.map(() => createRef()), [])
  const isSorted = useMemo(
    () => arrToSort.every((v, i, a) => !i || a[i - 1] <= v),
    [index]
  )

  // useEffect(() => {
  //   anime({
  //     targets: ".el",
  //     translateY: 10,
  //     easing: "easeInOutQuad",
  //     direction: "alternate",
  //     delay: anime.stagger(100, { from: "center" }),
  //     loop: true,
  //   })
  // }, [])

  useEffect(() => {
    // Move right if array is already sorted
    if (isSorted && iterate > 0)
      setTimeout(() => {
        handleLessAction()
      }, 1000)

    // Back to the beginning
    if (iterate - 1 <= index) {
      setIndex(0)
      setIterate(old => old - 1)
    }
  }, [index, isSorted])

  const handleLessAction = () => {
    if (arrToSort[index] < arrToSort[index + 1]) {
      if (index < arrToSort.length) {
        setIndex(old => old + 1)
      }
    }
  }

  const handleGreaterAction = () => {
    if (arrToSort[index] > arrToSort[index + 1]) {
      if (index < arrToSort.length) {
        swap(index, index + 1)
        setIndex(old => old + 1)
      }
    }
  }

  const swap = (sourceIndex: any, targetIndex: any) => {
    setArrToSort(old => {
      const temp = old[targetIndex]
      old[targetIndex] = old[sourceIndex]
      old[sourceIndex] = temp

      return old
    })
  }

  const spring = {
    type: "spring",
    damping: 20,
    stiffness: 300,
  }

  return (
    <Layout>
      <SquareHolder>
        {arrToSort.map((it, inx) => (
          <motion.li
            className={inx === index || inx === index + 1 ? "active el" : "el"}
            key={inx}
            layout
            transition={spring}
          >
            <span>{it}</span>
          </motion.li>
        ))}
      </SquareHolder>
      <Flex>
        <LessButton disabled={isSorted} onClick={handleLessAction}>
          {"<"}
        </LessButton>
        <GreaterButton disabled={isSorted} onClick={handleGreaterAction}>
          {">"}
        </GreaterButton>
      </Flex>
    </Layout>
  )
}

export default BubblePage
