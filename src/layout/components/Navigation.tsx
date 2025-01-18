import Flex from 'components/Box/Flex'
import { FlexProps } from 'components/Box/types'
import React from 'react'
import styled from 'styled-components'

export const Navigation: React.FC<FlexProps> = ({ ...props }) => {
  return <StyledNavigationContainer {...props}></StyledNavigationContainer>
}

const StyledNavigationContainer = styled(Flex)``

export default React.memo(Navigation)
