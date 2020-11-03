import React, { useRef, useState } from "react"
import styled from "styled-components"
import { theme } from "../../theme"

const boxSize = [36, 68, 84, 96, 112]

const StyledBox = styled.button<{
  isActive: boolean
  color: string
  size: number
  bg: string
  borderColor: string
}>`
  position: relative;
  display: flex;
  justify-content: center;
  text-align: center;
  align-items: center;
  font-family: Aubrey;
  font-size: ${theme.fontSizes[11]}rem;
  color: black;
  background-color: #${props => props.bg};
  width: ${props => boxSize[props.size]}px;
  height: ${props => boxSize[props.size]}px;
  border-radius: 32px;
  box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.25);
  margin: 25px;
  border: none;
  outline: none;

  :after {
    content: "";
    position: absolute;
    top: -12px;
    left: -12px;
    bottom: -12px;
    right: -12px;
    border-radius: 42px;
    border: 10px dashed #${props => props.borderColor};
  }
`

const Box: React.FC<{
  color?: string
  size?: number
  isActive?: boolean
  bg?: string
  borderColor?: string
}> = ({
  color = "black",
  size = 4,
  isActive = true,
  bg = "fff",
  borderColor = "7C54EF",
  children,
}) => {
  return (
    <StyledBox
      isActive={isActive}
      color={color}
      size={size}
      bg={bg}
      borderColor={borderColor}
    >
      {children}
    </StyledBox>
  )
}

export default Box
