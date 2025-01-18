import Box from 'components/Box/Box'
import styled from 'styled-components'
import { space } from 'styled-system'
import { CardProps } from './types'

export const StyledCard = styled(Box)<CardProps>`
  width: 100%;
  height: 100%;
  color: ${({ theme, isDisabled }) => theme.colors[isDisabled ? 'textDisabled' : 'text']};
  position: relative;

  ${space}
`

StyledCard.defaultProps = {
  isDisabled: false,
}
