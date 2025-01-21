import { InputProps, validateFormControl } from 'components/Input/Input'
import { InputValidator, ValidationError } from 'components/Input/validator'
import { useMemo, useState } from 'react'

export type FormFieldConfig = {
  value: any
  validateOnChange?: boolean
  validators?: InputValidator[]
  formatValue?: (value: any) => any
}

export type FieldState = {
  value: string
  errors: ValidationError[]
  isDirty: boolean
  isValidating?: boolean
  validatedValue?: string
  disabled?: boolean
}

type FieldStates<S extends string> = Record<S, FieldState>
type Controls<S extends string> = Record<S, InputProps>

function useForm<S extends string>(
  config: Record<S, FormFieldConfig>,
): {
  controls: Controls<S>
  states: FieldStates<S>
  submit: (callback?: () => void) => void
  validateAll: () => Promise<boolean>
  isValid: boolean
  validate: (fieldName: S) => Promise<ValidationError[]>
} {
  const [states, setStates] = useState<FieldStates<S>>(
    Object.keys(config).reduce((result, fieldName) => {
      result = {
        ...result,
        [fieldName]: {
          value: config[fieldName].value,
          errors: [],
          isDirty: false,
        },
      }
      return result
    }, {} as FieldStates<S>),
  )

  const setState = (key: keyof FieldState, fieldName: string) => (value: any) => {
    setStates((prev) => ({
      ...prev,
      [fieldName]: {
        ...prev[fieldName],
        [key]: value,
      },
    }))
  }

  const controls: Controls<S> = useMemo(
    () =>
      Object.keys(config).reduce((result, fieldName) => {
        const fieldConfig: FormFieldConfig = config[fieldName]
        const validators = [
          ...(fieldConfig.validators ?? []),
          (value: any) => {
            setState('isDirty', fieldName)(true)
            setState('validatedValue', fieldName)(value)
          },
        ]

        result = {
          ...result,
          [fieldName]: {
            value: states[fieldName].value,
            onValueChanged: (value: any) => {
              let _value = value
              if (fieldConfig.formatValue) {
                _value = fieldConfig.formatValue(value)
              }
              setState('value', fieldName)(_value)
            },
            clear: () => {
              setState('isDirty', fieldName)(false)
              setState('value', fieldName)('')
              setState('errors', fieldName)([])
            },
            onErrorChanged: setState('errors', fieldName),
            onValidating: () => setState('isValidating', fieldName)(true),
            onValidated: () => setState('isValidating', fieldName)(false),
            setDisabled: setState('disabled', fieldName),
            disabled: states[fieldName].disabled,
            validators,
            validateOnchange: states[fieldName].isDirty ? true : fieldConfig.validateOnChange,
          },
        }
        return result
      }, {} as Controls<S>),
    [config, states],
  )

  const submit = async (callback?: () => void) => {
    const isFormGroupValid = await validateAll()

    if (isFormGroupValid && callback) {
      callback()
    }
  }

  const validate = async (fieldName: S) => {
    let hasAsyncValidator = false
    const control = controls[fieldName]
    const state = states[fieldName]
    if (!control.validators || control.validators.length < 1) {
      return null
    }

    const parsedValidators = control.validators
      .map((validator) => {
        const result = validator(control.value)
        return Promise.resolve(result as ValidationError)
      })
      .filter((validator) => validator)

    const validateResult = await validateFormControl(parsedValidators)

    setState('errors', fieldName)(validateResult)
    if (hasAsyncValidator) setState('isValidating', fieldName)(false)

    return validateResult
  }
  const validateAll = async () => {
    let isValid = true
    const fieldNames = Object.keys(controls)

    for (let index = 0; index < fieldNames.length; index++) {
      const fieldName = fieldNames[index] as S
      const validateResult = await validate(fieldName)
      if (validateResult.some((item) => item !== null)) {
        isValid = false
      }
    }

    return isValid
  }

  const isValid = useMemo(() => {
    let result = true
    const stateValues = Object.values(states)
    for (let index = 0; index < stateValues.length; index++) {
      const state = stateValues[index] as FieldState

      if (state.errors.length > 0) {
        result = false
        break
      }
    }

    return result
  }, [states])

  return { controls, states, submit, validateAll, validate, isValid }
}

export default useForm
