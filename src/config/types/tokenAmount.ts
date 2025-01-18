
import BigNumber from 'bignumber.js'
import { Token } from './token'

export type TokenAmount = {
  amount: BigNumber,
  token: Token
}