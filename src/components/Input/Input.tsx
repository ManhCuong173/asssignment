import Flex from 'components/Box/Flex'
import { TextProps } from 'components/Text/types'
import React, { forwardRef, useRef, useState } from 'react'
import styled from 'styled-components'
import { space, SpaceProps, typography } from 'styled-system'
import { forkjoinRequest } from 'utils/requestHelper'
import { InputValidator, ValidationError } from './validator'

export interface InputProps {
  value: any
  onValueChanged: (value: any, event?: any) => void
  onErrorChanged?: (errors: ValidationError[]) => void
  onValidating?: () => void
  clear?: () => void
  onValidated?: () => void
  validators?: InputValidator[]
  validateOnchange?: boolean
  disabled?: boolean
  setDisabled?: (value: any) => void
  onBlur?: (event: any) => void
}

export const validateFormControl = async (validators: Promise<ValidationError>[]): Promise<ValidationError[]> => {
  const result = await forkjoinRequest(validators)
  return result.filter((error) => error)
}

const Input = forwardRef<
  HTMLInputElement,
  InputProps & React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
>(
  (
    {
      value,
      validators,
      validateOnchange,
      type,
      onValueChanged,
      onErrorChanged,
      onValidating,
      onValidated,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [errors, setErrors] = useState([])
    const validatedValue = useRef(null)

    const validate = async () => {
      if (validators && validators.length > 0 && onErrorChanged) {
        if (validatedValue.current === value) return errors
        let hasAsyncValidator = false
        const parsedValidators = validators
          .map((validator) => {
            const result = validator(value)
            return Promise.resolve(result as ValidationError)
          })
          .filter((validator) => validator)
        const validateErrors = await validateFormControl(parsedValidators)

        validatedValue.current = value
        if (hasAsyncValidator && onValidated) {
          onValidated()
        }

        onErrorChanged(validateErrors)
        setErrors(validateErrors)
      }
    }

    const handleOnBlur = async (e: any) => {
      validate()
      if (onBlur) onBlur(e)
    }

    const onChange = (e: any) => {
      if (type === 'checkbox') {
        onValueChanged(e.target.checked, e)
      } else {
        onValueChanged(e.target.value, e)
      }
    }

    const valueProps = type === 'checkbox' ? { checked: value } : { value }

    return <StyledInput ref={ref} {...props} onBlur={handleOnBlur} onChange={onChange} type={type} {...valueProps} />
  },
)

export const StyledInputContainer = styled(Flex)<{ $error: boolean }>`
  border: 1px solid ${({ theme, $error }) => ($error ? theme.colors.danger : theme.colors.inputBorder || '#E9EAEB')};
  border-radius: 6px;
  position: relative;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.background || '#FFFFFF'};
`

const StyledInput = styled.input<SpaceProps & TextProps>`
  padding: 4px 16px;
  color: ${({ theme }) => theme.colors.input};
  text-align: left;
  height: ${({ height }) => height || '36px'};
  outline: none;
  border: none;
  font-size: 16px;
  background: none;
  transition: border-color 0.2s ease, box-shadow 0.2s ease;
  width: 100%;
  border-radius: 8px;

  &::placeholder {
    color: ${({ theme }) => theme.colors.subtle || '#7A6EAA'};
  }

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary || '#1FC7D4'};
  }

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || '#1FC7D4'};
    box-shadow: 0 0 0 1px ${({ theme }) => theme.colors.primary || '#1FC7D4'}40;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.colors.backgroundDisabled};
    box-shadow: none;
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${space}
  ${typography}
`

export default Input
