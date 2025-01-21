import styled, { DefaultTheme } from 'styled-components'
import { layout, space, typography } from 'styled-system'
import { TextProps } from './types'

interface ThemedProps extends TextProps {
  theme: DefaultTheme
}

const getColor = ({ color, theme }: ThemedProps) => {
  return theme.colors[color] || color
}

const getFontSize = ({ fontSize, small }: TextProps) => {
  return small ? '12px' : fontSize || '14px'
}

const getLineHeight = ({ lineHeight }: TextProps) => {
  return lineHeight || 1.2
}

export const Text = styled.div<TextProps>`
  color: ${getColor};
  font-size: ${getFontSize};
  font-weight: ${({ bold }) => (bold ? 400 : 300)};
  line-height: ${getLineHeight};

  ${({ textTransform }) => textTransform && `text-transform: ${textTransform};`}
  ${({ ellipsis }) =>
    ellipsis &&
    `white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;`}

  ${space}
  ${typography}
  ${layout}
`

Text.defaultProps = {
  color: 'text',
  small: false,
  ellipsis: false,
}

export default Text
