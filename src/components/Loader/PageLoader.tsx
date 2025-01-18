import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'

const FIST_LOAD_DELAY = 1500

export default function PageLoader() {
  const [display, setDisplay] = useState(true)

  useEffect(() => {
    setTimeout(() => setDisplay(false), FIST_LOAD_DELAY)
  }, [])

  return (
    display && (
      <StyledBackground>
        <StyledImg src="/images/logo.png" />
      </StyledBackground>
    )
  )
}

const flyingAnim = () => keyframes`
  from {
    transform: translate(0,  0px);
  }
  50% {
    transform: translate(0px, -15px);
  }
  to {
    transform: translate(0, 0px);
  }
`

const StyledBackground = styled.div`
  background: ${({ theme }) => theme.colors.background};
  width: 100vw;
  height: 100vh;
  position: fixed;
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
`

const StyledImg = styled.img`
  height: 40%;
  animation: ${flyingAnim} 3s ease-in-out infinite;
`
