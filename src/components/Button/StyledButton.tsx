import styled, { DefaultTheme } from 'styled-components'
import { layout, space, variant } from 'styled-system'
import { styleScales, styleVariants } from './theme'
import { BaseButtonProps } from './types'

interface ThemedButtonProps extends BaseButtonProps {
  theme: DefaultTheme
}

interface TransientButtonProps extends ThemedButtonProps {
  $isLoading?: boolean
}

const getDisabledStyles = ({ $isLoading, theme }: TransientButtonProps) => {
  if ($isLoading === true) {
    return `
      &:disabled,
      &.button--disabled {
        cursor: not-allowed;
      }
    `
  }

  return `
    &:disabled,
    &.button--disabled {
      background: ${theme.colors.disabled};
      border-color: ${theme.colors.disabled};
      box-shadow: none;
      color: ${theme.colors.subtle};
      cursor: not-allowed;
    }
  `
}

/**
 * This is to get around an issue where if you use a Link component
 * React will throw a invalid DOM attribute error
 * @see https://github.com/styled-components/styled-components/issues/135
 */

const getOpacity = ({ $isLoading = false }: TransientButtonProps) => {
  return $isLoading ? '.9' : '1'
}

const StyledButton = styled.button<BaseButtonProps>`
  align-items: center;
  border: 0;
  border-radius: 6px;
  cursor: pointer;
  outline: 0;
  display: inline-flex;
  font-family: inherit;
  font-size: 12px;
  font-weight: 400;
  justify-content: center;
  letter-spacing: -0.02em;
  padding: 0px 6px;
  line-height: 1;
  opacity: ${getOpacity};
  transition: background-color 0.2s, opacity 0.2s;

  &:hover:not(:disabled):not(:active) {
    transition: transform 0.1s ease-in-out 0s;
    transform: scale(1.025);
  }

  &:active:not(:disabled) {
    opacity: 1;
  }

  ${getDisabledStyles}
  ${variant({
    variants: styleVariants,
  })}
  ${variant({
    prop: 'scale',
    variants: styleScales,
  })}

  ${layout}
  ${space}
`

export default StyledButton
