import { TextProps } from 'components/Text/types'
import styled from 'styled-components'
import { space, SpaceProps, typography } from 'styled-system'

const Input = styled.input<SpaceProps & TextProps>`
  border: 0;
  color: ${({ theme }) => theme.colors.input};
  display: block;
  text-align: left;
  height: ${({ height }) => height || '36px'};
  outline: none;
  padding: 4px 12px;
  font-size: 16px;


  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    cursor: not-allowed;
  }

  ${space}
  ${typography}
`

export default Input
