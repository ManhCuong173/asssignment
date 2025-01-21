import { ElementType, ReactNode } from 'react'
import { LayoutProps, SpaceProps } from 'styled-system'
import { PolymorphicComponentProps } from './utils'

export const variants = {
  PRIMARY: 'primary',
  SECONDARY: 'secondary',
  ROUND: 'round',
  HIGHLIGHT: 'highlight',
  TEXT: 'text',
  GRADIENT: 'gradient',
  LIGHT: 'light',
  GRAY: 'gray',
  ERROR: 'error',
} as const

export type Variant = (typeof variants)[keyof typeof variants]

export const scales = {
  SM: 'sm',
  MD: 'md',
  LG: 'lg',
} as const

export type Scale = (typeof scales)[keyof typeof scales]

export interface BaseButtonProps extends LayoutProps, SpaceProps {
  as?: 'a' | 'button' | ElementType
  external?: boolean
  isLoading?: boolean
  variant?: Variant
  scale?: Scale
  disabled?: boolean
  startIcon?: ReactNode
  endIcon?: ReactNode
}

export type ButtonProps<P extends ElementType = 'button'> = PolymorphicComponentProps<P, BaseButtonProps>
