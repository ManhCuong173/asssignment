export enum ValidationError {
    IsRequired = 'IsRequired',
    GreaterThanEqual = 'GreaterThanEqual'
  }

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

  export type InputValidator = (inputValue: string | number) => ValidationError | null