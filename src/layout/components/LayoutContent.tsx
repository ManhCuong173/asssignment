import styled from 'styled-components'
import Column from './Column'

const LayoutContent = ({ children, ...props }) => {
  return <StyledLayoutContentContainer {...props}>{children}</StyledLayoutContentContainer>
}

const StyledLayoutContentContainer = styled(Column)`
  width: 100%;
  flex: 1 1;
  min-height: ${({ theme }) => `calc(100vh - ${theme.layout.topbarHeight}px)`};
  align-items: stretch;
  justify-content: center;
`

export default LayoutContent
