import { graphql, Link, useStaticQuery } from "gatsby"
import React, { useRef, useState } from "react"
import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`

const BubbleTheory: any = () => {
  return (
    <Wrapper>
      <iframe
        width="760"
        height="515"
        src="https://www.youtube.com/embed/4s44rXRdmhQ"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </Wrapper>
  )
}

export default BubbleTheory
