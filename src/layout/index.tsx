import React from 'react'
import styled from 'styled-components'
import LayoutContent from './components/LayoutContent'

export const StyledLayoutWrapper = styled.div`
  min-height: 100vh;
  height: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`

const Layout = ({ children, ...props }) => {
  return (
    <StyledLayoutWrapper>
      <LayoutContent {...props}>{children}</LayoutContent>
    </StyledLayoutWrapper>
  )
}

export default Layout
