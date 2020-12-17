import React, { forwardRef, useRef, useState } from "react"
import styled from "styled-components"
import { theme } from "../../theme"

const boxSize = [36, 68, 84, 96, 102]

const StyledBox = styled.button<{
  isActive: boolean
  isDisabled: boolean
  color: string
  size: number
  bg: string
  borderColor: string
}>`
  @keyframes rotation {
    0% {
      transform: rotate(0deg);
    }
    25% {
      transform: rotate(90deg);
    }
    50% {
      transform: rotate(180deg);
    }
    75% {
      transform: rotate(270deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

  // TODO: calc(x - size)
  min-width: 70px;
  width: 8vw;
  max-width: 110px;

  min-height: 70px;
  height: 8vw;
  max-height: 110px;

  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-family: Aubrey;
  color: ${props => (props.isDisabled ? "#444" : "black")};
  background-color: ${props => (props.isDisabled ? "grey" : props.bg)};

  border-radius: 32px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 25px;
  border: none;
  outline: none;

  :after {
    content: "";
    // animation: rotation 1s infinite step-end;
    position: absolute;
    top: -12px;
    left: -12px;
    bottom: -12px;
    right: -12px;
    border-radius: 42px;
    border: ${props => (props.isActive ? 5 : 0)}px dashed
      ${props => props.borderColor};
  }

  font-size: ${theme.fontSizes[11]}rem;

  @media only screen and (max-width: ${theme.breakpoints[4]}px) {
    font-size: ${theme.fontSizes[10]}rem !important;
  }

  @media only screen and (max-width: ${theme.breakpoints[2]}px) {
    font-size: ${theme.fontSizes[9]}rem !important;

    :after {
      border: ${props => (props.isActive ? 4 : 0)}px dashed
        ${props => props.borderColor};
    }
  }
`

const Box: React.FC<{
  color?: string
  size?: number
  isActive?: boolean
  isDisabled?: boolean
  bg?: string
  borderColor?: string
}> = forwardRef(
  (
    {
      color = "black",
      size = 4,
      isActive = true,
      isDisabled = false,
      bg = "#fff",
      borderColor = "#7C54EF",
      children,
    },
    ref
  ) => {
    return (
      <StyledBox
        ref={ref as any}
        isActive={isDisabled ? false : isActive}
        isDisabled={isDisabled}
        color={color}
        size={size}
        bg={bg}
        borderColor={borderColor}
        className="box"
      >
        {children}
      </StyledBox>
    )
  }
)

export default Box
