import Box from 'components/Box/Box'
import { BoxProps } from 'components/Box/types'
import React from 'react'
import styled from 'styled-components'

const ModalBody: React.FC<BoxProps> = ({ children, ...props }) => {
  return <StyledModalBody {...props}>{children}</StyledModalBody>
}

const StyledModalBody = styled(Box)`
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;

  width: 100%;
`
export default styled(ModalBody)``
