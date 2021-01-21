import { motion } from "framer-motion"
import styled from "styled-components"

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 100%;
`

export const ButtonNext = styled(motion.button)`
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

export const ButtonReset = styled(motion.button)`
  position: absolute;
  top: 30px;
  right: 30px;
  @media only screen and (max-width: 980px) {
    top: 20px;
    right:20px;
  }


  max-width: 75px;
  max-height: 75px;

  min-width: 50px;
  width: 10vw;
  min-height: 50px;
  height: 10vw;

  svg {
    width: 100%;
    height: 100%;
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
