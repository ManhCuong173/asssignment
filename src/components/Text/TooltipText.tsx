import styled from 'styled-components'
import Text from './index'

const TooltipText = styled(Text)`
  text-decoration: ${({ theme }) => `underline dotted ${theme.colors.input}`};
  text-underline-offset: 0.1em;
`

export default TooltipText
