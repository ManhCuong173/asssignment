import Box from 'components/Box/Box'
import React from 'react'
import styled from 'styled-components'

const LayoutContent = ({ children, ...props }) => {
  return <StyledLayoutContentContainer {...props}>{children}</StyledLayoutContentContainer>
}

const StyledLayoutContentContainer = styled(Box)`
  width: 100%;
  flex: 1 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;

  padding: 80px 0;

  padding-top: ${({theme}) => `${theme.layout.topbarHeight}px`};
`

export default React.memo(LayoutContent)
