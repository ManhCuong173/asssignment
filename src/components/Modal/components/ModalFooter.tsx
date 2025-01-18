import Box from 'components/Box/Box'
import { BoxProps } from 'components/Box/types'
import React from 'react'
import styled from 'styled-components'

const ModalFooter: React.FC<BoxProps> = ({ children, ...props }) => {
  return <StyledFooterContainer {...props}>{children}</StyledFooterContainer>
}

const StyledFooterContainer = styled(Box)`
  width: 100%;
  padding: ${({ theme: { base: {spacing} } }) => spacing[1]};
  display: flex;
  align-items: center;
`

export default styled(ModalFooter)``
