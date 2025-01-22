import BigNumber from "bignumber.js"
import { ValidationError } from "components/Input/validator"

export class FormValidator {
    static gte =
    (min: number | string | BigNumber) =>
    (value: number | string | BigNumber): ValidationError => {
      return new BigNumber(value).gte(new BigNumber(min)) ? ValidationError.GreaterThanEqual : null
    } 
}