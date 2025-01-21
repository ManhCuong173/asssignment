import styled from 'styled-components'

export const StyledLayoutWrapper = styled.div`
  min-height: 100vh;
  height: 100%;
  background: ${({ theme }) => theme.colors.background};
`

const Layout = ({ children }) => {
  return <StyledLayoutWrapper>{children}</StyledLayoutWrapper>
}

export default Layout
