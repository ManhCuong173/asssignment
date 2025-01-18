import Box from 'components/Box/Box'
import { BoxProps } from 'components/Box/types'
import React from 'react'
import styled from 'styled-components'

const ModalHeader: React.FC<BoxProps> = ({ children, ...props }) => {
  return (
    <StyledContainer minHeight="70px" mb="-10px">
      <StyledHeaderContainer {...props}>{children}</StyledHeaderContainer>
    </StyledContainer>
  )
}

const StyledContainer = styled(Box)``
const StyledHeaderContainer = styled(Box)`
  width: 100%;
  height: 60px;
  display: flex;
  align-items: center;
`

export default styled(ModalHeader)``
