import { cloneElement, ElementType, isValidElement } from 'react'
import StyledButton from './StyledButton'
import { ButtonProps, scales, variants } from './types'

const Button = <E extends ElementType = 'button'>(props: ButtonProps<E>): JSX.Element => {
  const { startIcon, endIcon, external, className, isLoading, disabled, children, ...rest } = props
  const isDisabled = isLoading || disabled
  const classNames = className ? [className] : []

  return (
    <StyledButton $isLoading={isLoading} className={classNames.join(' ')} disabled={isDisabled} {...rest}>
      <>
        {isValidElement(startIcon) &&
          cloneElement(startIcon, {
            style: { marginRight: '0.5rem' },
          } as any)}
        {children}
        {isValidElement(endIcon) &&
          cloneElement(endIcon, {
            style: { marginLeft: '0.5rem' },
          } as any)}
      </>
    </StyledButton>
  )
}

Button.defaultProps = {
  isLoading: false,
  external: false,
  variant: variants.PRIMARY,
  scale: scales.MD,
  disabled: false,
}

export default Button
