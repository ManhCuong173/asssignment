import { LayoutProps, SpaceProps, TypographyProps } from 'styled-system'

export interface TextProps extends SpaceProps, TypographyProps, LayoutProps {
  color?: string
  fontSize?: string | string[]
  bold?: boolean
  small?: boolean
  ellipsis?: boolean
  textTransform?: 'uppercase' | 'lowercase' | 'capitalize'
  lineHeight?: string | number | (string | number)[]
}
